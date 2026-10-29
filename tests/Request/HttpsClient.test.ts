import Buckaroo from '../../src';
import {
    assertAllRequestsConsumed,
    mockResponse,
    recordedRequests,
    resetRequests,
    transactionResponse,
} from '../Support/HttpMock';

describe('Testing HTTP transport', () => {
    test('rejects an unexpected request instead of contacting the gateway', async () => {
        const client = new Buckaroo({ websiteKey: 'test-store', secretKey: 'test-secret' });
        await expect(client.method('ideal').pay({ amountDebit: 10 }).request()).rejects.toThrow(
            'Unexpected HTTP request'
        );
        expect(() => assertAllRequestsConsumed()).toThrow();
        resetRequests();
    });

    test('serializes and signs a request and wraps the mocked response', async () => {
        const client = new Buckaroo({ websiteKey: 'test-store', secretKey: 'test-secret' });
        mockResponse(transactionResponse());
        const response = await client.method('ideal').pay({ amountDebit: 10, issuer: 'ABNANL2A' }).request();
        expect(response.isSuccess()).toBe(true);
        expect(response.getTransactionKey()).toBe('test-transaction');
        expect(recordedRequests()).toEqual([
            expect.objectContaining({
                method: 'POST',
                path: '/json/Transaction',
                data: expect.objectContaining({
                    AmountDebit: 10,
                    Currency: 'EUR',
                    Services: {
                        ServiceList: [
                            {
                                Name: 'ideal',
                                Action: 'Pay',
                                Version: 2,
                                Parameters: [{ Name: 'Issuer', Value: 'ABNANL2A' }],
                            },
                        ],
                    },
                }),
            }),
        ]);
    });

    test('resolves a declined payment as a response instead of throwing', async () => {
        const client = new Buckaroo({ websiteKey: 'test-store', secretKey: 'test-secret' });
        mockResponse(transactionResponse(490));
        const response = await client.method('ideal').pay({ amountDebit: 10, issuer: 'ABNANL2A' }).request();
        expect(response.isFailed()).toBe(true);
    });
});

import { AxiosError } from 'axios';
import {
    AuthenticationError,
    BuckarooApiError,
    BuckarooError,
    HttpClientResponse,
    HttpMethods,
    HttpsClient,
} from '../../src';

describe('Testing transport options and errors', () => {
    test('GET sends no payload and request options override the default timeout', async () => {
        const adapter = jest.fn(async (config) => ({
            data: { Value: 1 },
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
        }));
        const result = await new HttpsClient(undefined, 1000).sendRequest(
            new URL('https://example.com/status'),
            { secret: 'not-a-get-body' },
            { method: HttpMethods.GET, timeout: 20, adapter },
            HttpClientResponse
        );
        expect(adapter.mock.calls[0][0]).toMatchObject({ timeout: 20, data: undefined });
        expect(result.httpResponse.status).toBe(200);
        expect(result.data).toMatchObject({ value: 1 });
    });
    const sendFailing = (error: unknown) =>
        new HttpsClient().sendRequest(
            new URL('https://example.com/pay'),
            {},
            {
                method: HttpMethods.POST,
                adapter: async () => {
                    throw error;
                },
            },
            HttpClientResponse
        );
    const httpError = (status: number, data: object = {}) => {
        const error = new AxiosError('request failed');
        error.response = { status, data, headers: { 'content-type': 'application/json' } } as any;
        return error;
    };

    test.each([400, 404, 500])('wraps an HTTP %i response in BuckarooApiError', async (status) => {
        const error = httpError(status, { Error: 'declined' });
        const thrown = await sendFailing(error).catch((e) => e);
        expect(thrown).toBeInstanceOf(BuckarooApiError);
        expect(thrown).toBeInstanceOf(BuckarooError);
        expect(thrown).toBeInstanceOf(Error);
        expect(thrown.message).toBe(`Buckaroo API returned HTTP status ${status}`);
        expect(thrown).toMatchObject({
            httpStatus: status,
            body: { Error: 'declined' },
            headers: { 'content-type': 'application/json' },
            cause: error,
        });
    });
    test.each([401, 403])('wraps an HTTP %i response in AuthenticationError', async (status) => {
        const error = httpError(status, { Message: 'Invalid signature' });
        const thrown = await sendFailing(error).catch((e) => e);
        expect(thrown).toBeInstanceOf(AuthenticationError);
        expect(thrown).not.toBeInstanceOf(BuckarooApiError);
        expect(thrown).toMatchObject({ httpStatus: status, body: { Message: 'Invalid signature' }, cause: error });
    });
    test('keeps the signed request out of the serialized error', async () => {
        const error = httpError(500);
        error.config = { headers: { Authorization: 'hmac store:signature' }, data: '{"Invoice":"INV"}' } as any;
        const thrown = await sendFailing(error).catch((e) => e);
        expect(thrown.cause).toBe(error);
        expect(JSON.stringify(thrown)).toBe(
            '{"name":"BuckarooApiError","httpStatus":500,"body":{},"headers":{"content-type":"application/json"}}'
        );
    });
    test('wraps a network failure without a response in BuckarooApiError', async () => {
        const error = new AxiosError('timeout of 10ms exceeded', 'ECONNABORTED');
        const thrown = await sendFailing(error).catch((e) => e);
        expect(thrown).toBeInstanceOf(BuckarooApiError);
        expect(thrown.message).toBe('Request failed: timeout of 10ms exceeded');
        expect(thrown.httpStatus).toBeUndefined();
        expect(thrown.cause).toBe(error);
    });
    test('preserves non-Axios errors', async () => {
        const error = new Error('adapter failed');
        await expect(sendFailing(error)).rejects.toBe(error);
    });
});
