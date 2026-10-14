import Buckaroo, { DataRequestData, HttpMethods, IRequest, Request, RequestTypes } from '../../src';
import { issuerResponse, mockResponse, recordedRequests } from '../Support/HttpMock';

describe('Testing request factories', () => {
    beforeEach(() => {
        Buckaroo.InitializeClient(
            { websiteKey: 'test-store', secretKey: 'test-secret' },
            { mode: 'TEST', currency: 'EUR' }
        );
    });
    test('builds data, batch-data and multi-service specification requests', async () => {
        mockResponse({}, '/json/DataRequest');
        mockResponse({ Message: 'queued' }, '/json/batch/DataRequests');
        mockResponse(issuerResponse, '/json/Transaction/Specifications');
        await Request.DataRequest({ invoice: 'INV', additionalParameters: { note: 'test' } }).request();
        await Request.BatchDataRequest([new DataRequestData({ invoice: 'BATCH' })]).request();
        await Request.Specification(RequestTypes.Transaction, [
            { name: 'ideal', version: 2 },
            { name: 'paypal', version: 1 },
        ]).request();
        expect(recordedRequests()).toEqual([
            expect.objectContaining({
                data: expect.objectContaining({
                    Invoice: 'INV',
                    AdditionalParameters: { List: [{ Name: 'Note', Value: 'test' }] },
                }),
            }),
            expect.objectContaining({ data: [expect.objectContaining({ Invoice: 'BATCH' })] }),
            expect.objectContaining({
                data: {
                    Services: [
                        { Name: 'ideal', Version: 2 },
                        { Name: 'paypal', Version: 1 },
                    ],
                },
            }),
        ]);
    });
    test('gets a default response wrapper without posting a body', async () => {
        mockResponse({ Value: 1 }, '/status', 'GET');
        const result = await new Request('/status', HttpMethods.GET).request();
        expect(result.data).toMatchObject({ value: 1 });
        expect(recordedRequests()[0]).toMatchObject({ method: 'GET', path: '/status', data: undefined });
    });
    test('rejects missing credentials and unknown methods', () => {
        expect(() => new Buckaroo({ websiteKey: '', secretKey: '' })).toThrow('Missing required credentials');
        expect(() => Buckaroo.Client.method('not-a-method' as any)).toThrow('Invalid payment method code');
        Buckaroo.Client.config = { mode: 'LIVE', currency: 'USD' };
        expect(Request.Transaction().url.hostname).toBe('checkout.buckaroo.nl');
    });
});

test('preserves explicit transaction options without changing client configuration', () => {
    const client = Buckaroo.InitializeClient(
        { websiteKey: 'test-store', secretKey: 'test-secret' },
        { mode: 'TEST', currency: 'EUR' }
    );
    const options: IRequest = {
        amountDebit: 10,
        amountCredit: 2,
        clientUserAgent: 'Test Browser',
        clientIP: '203.0.113.10',
        order: 'ORDER',
        invoice: 'INV',
        description: 'Test order',
        currency: 'USD',
        culture: 'en-US',
        continueOnIncomplete: false,
        startRecurrent: true,
        pushURL: 'https://example.com/push',
        pushURLFailure: 'https://example.com/push-failed',
        returnURL: 'https://example.com/return',
        returnURLCancel: 'https://example.com/cancel',
        returnURLError: 'https://example.com/error',
        returnURLReject: 'https://example.com/reject',
        originalTransactionKey: 'original',
        originalTransactionReference: { type: 'invoice', reference: 'old-invoice' },
        servicesExcludedForClient: 'paypal',
        servicesSelectableByClient: ['ideal', 'visa'],
    };
    const request = Request.Transaction(options);
    expect(JSON.parse(JSON.stringify(request.data))).toMatchObject({
        AmountDebit: 10,
        AmountCredit: 2,
        ClientUserAgent: 'Test Browser',
        ClientIP: { type: 0, address: '203.0.113.10' },
        Order: 'ORDER',
        Invoice: 'INV',
        Description: 'Test order',
        Currency: 'USD',
        Culture: 'en-US',
        ContinueOnIncomplete: 0,
        StartRecurrent: true,
        PushURL: 'https://example.com/push',
        PushURLFailure: 'https://example.com/push-failed',
        ReturnURL: 'https://example.com/return',
        ReturnURLCancel: 'https://example.com/cancel',
        ReturnURLError: 'https://example.com/error',
        ReturnURLReject: 'https://example.com/reject',
        OriginalTransactionKey: 'original',
        OriginalTransactionReference: { type: 'invoice', reference: 'old-invoice' },
        ServicesExcludedForClient: 'paypal',
        ServicesSelectableByClient: 'ideal,visa',
    });
    expect(client.config).toEqual({ mode: 'TEST', currency: 'EUR' });
});

import { initialize, credentials } from '../Support/Client';
test('request factories work as Array.map callbacks', async () => {
    const { send } = initialize();
    const payloads: IRequest[] = [{ amountDebit: 10 }, { amountDebit: 20 }];
    const requests = [
        ...payloads.map(Request.Transaction),
        ...payloads.map(Request.DataRequest),
        ...[payloads].map(Request.BatchTransaction),
        ...[[new DataRequestData({ invoice: 'batch' })]].map(Request.BatchDataRequest),
    ];
    for (const request of requests) await request.request();
    expect(send).toHaveBeenCalledTimes(6);
    for (const [, , options] of send.mock.calls) expect(options.headers!.Authorization).toMatch(/^hmac compat-store:/);
});

class CustomRequest extends Request {
    client = 'consumer-owned';
}

test('a consumer client field does not replace the request owner', async () => {
    const { send } = initialize();
    const request = new CustomRequest('/status');
    initialize('another-store');
    await request.request();
    expect(request.client).toBe('consumer-owned');
    expect(send).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(request)).not.toContain(credentials.secretKey);
});

test('a request created before initialization binds once on first use', async () => {
    const previous = Buckaroo.Client;
    try {
        (Buckaroo as any)._client = undefined;
        const request = Request.Transaction({ amountDebit: 10 });
        const { send } = initialize();
        await request.request();
        const other = initialize('another-store');
        await request.request();
        expect(send).toHaveBeenCalledTimes(2);
        expect(other.send).not.toHaveBeenCalled();
    } finally {
        (Buckaroo as any)._client = previous;
    }
});
