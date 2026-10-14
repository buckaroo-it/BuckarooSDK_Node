import { AxiosHeaders, AxiosResponse } from 'axios';
import { Hmac, HttpClientResponse } from '../../../src';

const credentials = { websiteKey: 'test-store', secretKey: 'test-secret' };
const url = 'https://testcheckout.buckaroo.nl/json/Transaction';
const body = '{"Key":"test-transaction","Status":{"Code":{"Code":190}}}';
const signer = new Hmac();
signer.url = url;
signer.data = body;
const authorization = signer.generate(credentials, 'nonce', '1767268800');

describe('Testing HTTP response authentication', () => {
    test.each([body, JSON.parse(body)])('validates a string or Axios-parsed response', (data) => {
        const result = new HttpClientResponse({
            data,
            status: 200,
            statusText: 'OK',
            headers: { authorization },
            config: { url, method: 'post', headers: new AxiosHeaders() },
        } as AxiosResponse);
        expect(result.validateResponse(credentials)).toBe(true);
        expect(result.data).toMatchObject({ key: 'test-transaction', status: { code: { code: 190 } } });
    });
    test('rejects tampered or unsigned responses', () => {
        const data = JSON.parse(body);
        data.Status.Code.Code = 490;
        expect(
            new HttpClientResponse({
                data,
                status: 200,
                statusText: 'OK',
                headers: { authorization },
                config: { url, method: 'post', headers: new AxiosHeaders() },
            } as AxiosResponse).validateResponse(credentials)
        ).toBe(false);
        expect(
            new HttpClientResponse({
                data,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { url, method: 'post', headers: new AxiosHeaders() },
            } as AxiosResponse).validateResponse(credentials)
        ).toBe(false);
    });
});

test('uses request metadata when config has no URL or method and prefers explicit Axios config', () => {
    const fallback = new HttpClientResponse({
        data: JSON.parse(body),
        headers: { authorization },
        status: 200,
        statusText: 'OK',
        config: { headers: new AxiosHeaders() },
        request: { url, method: 'POST' },
    } as AxiosResponse);
    expect(fallback.validateResponse(credentials)).toBe(true);
    expect(fallback.rawData).toEqual(JSON.parse(body));
    const preferred = new HttpClientResponse({
        data: JSON.parse(body),
        status: 200,
        statusText: 'OK',
        headers: { authorization },
        config: { url, method: 'post', headers: new AxiosHeaders() },
        request: { url: 'https://example.com/wrong', method: 'GET' },
    });
    expect(preferred.validateResponse(credentials)).toBe(true);
});

test.each(['', 'OK', '<html>maintenance</html>'])(
    'keeps status and raw data available for non-JSON body %j',
    (data) => {
        const httpResponse = {
            data,
            status: data ? 200 : 204,
            statusText: 'OK',
            headers: {},
            config: { headers: new AxiosHeaders() },
        };
        const response = new HttpClientResponse(httpResponse);
        expect(response.httpResponse.status).toBe(httpResponse.status);
        expect(response.rawData).toBe(data);
        expect(response.validateResponse(credentials)).toBe(false);
    }
);
