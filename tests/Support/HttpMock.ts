import { AxiosAdapter } from 'axios';

const replies: { data: object; path: string; method: string }[] = [];
const requests: object[] = [];
const failures: unknown[] = [];

export function mockResponse(data: object, path = '/json/Transaction', method = 'POST') {
    replies.push({ data, path, method });
}

export const mockAdapter: AxiosAdapter = async (config) => {
    const reply = replies.shift();
    try {
        if (!reply) throw new Error(`Unexpected HTTP request: ${config.method} ${config.url}`);
        const url = new URL(config.url!);
        expect(url.pathname).toBe(reply.path);
        expect(config.method?.toUpperCase()).toBe(reply.method);
        requests.push({
            method: config.method?.toUpperCase(),
            path: url.pathname + url.search,
            data: typeof config.data === 'string' ? JSON.parse(config.data) : config.data,
            channel: config.headers.Channel,
        });
        return { data: reply.data, status: 200, statusText: 'OK', headers: {}, config };
    } catch (error) {
        failures.push(error);
        throw error;
    }
};

export function resetRequests() {
    replies.length = 0;
    requests.length = 0;
    failures.length = 0;
}

export function assertAllRequestsConsumed() {
    expect(failures).toEqual([]);
    expect(replies).toHaveLength(0);
}

export function recordedRequests() {
    return requests;
}

export function transactionResponse(code = 190): object {
    return {
        Key: 'test-transaction',
        Status: { Code: { Code: code, Description: 'Test response' }, SubCode: { Code: 'S001' } },
        RelatedTransactions: [{ RelatedTransactionKey: 'test-related-transaction' }],
        Services: [
            {
                Name: 'test',
                Parameters: [
                    { Name: 'VoucherCode', Value: 'test-voucher' },
                    { Name: 'SubscriptionGuid', Value: 'test-subscription' },
                    { Name: 'InvoiceKey', Value: 'test-invoice' },
                ],
            },
        ],
    };
}

export const issuerResponse = {
    Actions: [
        {
            Name: 'Pay',
            RequestParameters: ['issuer', 'Issuer'].map((Name) => ({
                Name,
                ListItemDescriptions: [{ Value: 'ABNANL2A', Description: 'ABN AMRO' }],
            })),
        },
    ],
};
