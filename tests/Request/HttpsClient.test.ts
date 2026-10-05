import Buckaroo from '../../src';
import {
    assertAllRequestsConsumed,
    mockResponse,
    recordedRequests,
    resetRequests,
    transactionResponse,
} from '../Utils/HttpMock';

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
});

import { AxiosError } from 'axios';
import { HttpClientResponse, HttpMethods, HttpsClient } from '../../src';

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
    test.each([true, false])('preserves HTTP or network errors (response=%s)', async (withResponse) => {
        const error = new AxiosError('request failed');
        if (withResponse) error.response = { data: { Error: 'declined' } } as any;
        const adapter = async () => {
            throw error;
        };
        await expect(
            new HttpsClient().sendRequest(
                new URL('https://example.com/pay'),
                {},
                { method: HttpMethods.POST, adapter },
                HttpClientResponse
            )
        ).rejects.toEqual(withResponse ? { Error: 'declined' } : error);
    });
    test('preserves non-Axios errors', async () => {
        const error = new Error('adapter failed');
        await expect(
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
            )
        ).rejects.toBe(error);
    });
});
