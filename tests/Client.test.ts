import { Agent } from 'https';
import Buckaroo, {
    ActiveSubscriptions,
    Credentials,
    getMethod,
    Hmac,
    HttpClientResponse,
    HttpsClient,
    ICredentials,
    IRequest,
    Request,
    TransactionResponse,
    TransactionService,
    uniqid,
} from '../src';
import client from './BuckarooClient';
import { creditManagementTestInvoice } from './Payloads/CreditManagement';
import { issuerResponse, mockResponse, recordedRequests, transactionResponse } from './Utils/HttpMock';

describe('Testing Buckaroo Client', () => {
    test('Credentials', async () => {
        mockResponse(issuerResponse, '/json/Transaction/Specification/ideal', 'GET');
        return client.confirmCredentials().then((response) => {
            expect(response).toBeTruthy();
        });
    });
    test('Batch transaction', async () => {
        mockResponse({ Message: '3 transactions were queued for processing.' }, '/json/batch/Transactions');
        const transactionData: IRequest[] = [];
        const creditManagement = client.method('creditmanagement3');
        const sepaDirectDebit = client.method('sepadirectdebit');
        for (let i = 0; i < 3; i++) {
            const combinedInvoice = creditManagement.createCombinedInvoice(creditManagementTestInvoice());

            const sepaRequest = sepaDirectDebit.combine(combinedInvoice.data).pay({
                iban: 'NL39RABO0300065264',
                bic: 'RABONL2U',
                mandateReference: '1DCtestreference',
                mandateDate: '2022-07-03',
                collectDate: '2020-07-03',
                amountDebit: 10.1,
                customer: {
                    name: 'John Smith',
                },
                invoice: uniqid('TestInvoice'),
            });

            transactionData.push(sepaRequest.data);
        }

        await client.batch
            .transaction(transactionData)
            .request()
            .then((response) => {
                expect(response.data.message === '3 transactions were queued for processing.').toBeTruthy();
            })
            .catch((err) => {
                expect(err).toBeUndefined();
            });
    });
    describe('Transaction', () => {
        const transactionService = client.transaction('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        test('transaction Status', async () => {
            mockResponse(transactionResponse(), '/json/Transaction/Status/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'GET');
            return transactionService
                .status()
                .then((res) => {
                    expect(res instanceof TransactionResponse).toBeTruthy();
                })
                .catch((err) => {
                    expect(err).toBeUndefined();
                });
        });
        test('transaction Cancel Info', async () => {
            mockResponse({}, '/json/Transaction/Cancel/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'GET');
            return transactionService.cancelInfo().then((res) => {
                expect(res instanceof HttpClientResponse).toBeTruthy();
            });
        });

        test('transaction Refund Info', async () => {
            mockResponse({}, '/json/Transaction/RefundInfo/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'GET');
            return transactionService.refundInfo().then((res) => {
                expect(res instanceof HttpClientResponse).toBeTruthy();
            });
        });
    });

    describe('Active Subscription', () => {
        test('Get', async () => {
            mockResponse(
                {
                    Services: [
                        {
                            Parameters: [
                                {
                                    Value: '<ArrayOfServiceCurrencies><ServiceCurrencies><ServiceCode>ideal</ServiceCode><Currencies><string>EUR</string></Currencies></ServiceCurrencies></ArrayOfServiceCurrencies>',
                                },
                            ],
                        },
                    ],
                },
                '/json/DataRequest'
            );
            await client.getActiveSubscriptions().then((response) => {
                expect(response).toEqual([{ serviceCode: 'ideal', currencies: ['EUR'] }]);
            });
        });
    });

    describe('Client isolation', () => {
        const credentialsA = { websiteKey: 'store-a', secretKey: 'synthetic-secret-a' };
        const credentialsB = { websiteKey: 'store-b', secretKey: 'synthetic-secret-b' };

        function initialize(credentials = credentialsA) {
            return Buckaroo.InitializeClient(credentials, {
                mode: credentials === credentialsA ? 'TEST' : 'LIVE',
                currency: credentials === credentialsA ? 'EUR' : 'USD',
                pushURL: `https://${credentials.websiteKey}.example/push`,
                timeout: credentials === credentialsA ? 1000 : 2000,
            });
        }

        function capture(client: Buckaroo) {
            return jest.spyOn(client.httpClient, 'sendRequest').mockResolvedValue({
                httpResponse: { status: 200 },
                data: {},
            } as any);
        }

        function expectSignedBy(send: ReturnType<typeof capture>, credentials: ICredentials) {
            expect(send).toHaveBeenCalled();
            for (const [url, data, options] of send.mock.calls) {
                const validate = (keys: ICredentials) =>
                    new Hmac().validate(
                        keys,
                        options.headers!.Authorization!,
                        url.toString(),
                        JSON.stringify(data),
                        options.method!
                    );
                expect(validate(credentials)).toBe(true);
                expect(validate(credentials === credentialsA ? credentialsB : credentialsA)).toBe(false);
                expect(url.hostname).toBe(
                    credentials === credentialsA ? 'testcheckout.buckaroo.nl' : 'checkout.buckaroo.nl'
                );
            }
        }

        afterEach(() => jest.restoreAllMocks());

        test('retained clients and builders use their owner for payments, combinations and specifications', async () => {
            const a = initialize();
            const sendA = capture(a);
            const builder = a.method('mastercard');
            const b = initialize(credentialsB);
            const sendB = capture(b);

            await a.method('mastercard').pay({ amountDebit: 1 }).request();
            await a.method().pay({ amountDebit: 2 }).request();
            await builder.combine('visa').pay({ amountDebit: 3 }).request();
            await builder.specification().request();
            await a.method('buckaroovoucher').getBalance({ voucherCode: 'synthetic-voucher' }).request();
            await b.method('mastercard').pay({ amountDebit: 4 }).request();

            expect(sendA).toHaveBeenCalledTimes(5);
            expectSignedBy(sendA, credentialsA);
            expectSignedBy(sendB, credentialsB);
            for (const [, data, options] of sendA.mock.calls) {
                if (options.method === 'POST') {
                    expect(JSON.parse(JSON.stringify(data))).toMatchObject({
                        Currency: 'EUR',
                        PushURL: 'https://store-a.example/push',
                    });
                }
            }
        });

        test('a pending payment keeps its client across another initialization and an await', async () => {
            const a = initialize();
            const sendA = capture(a);
            const pending = a.method('mastercard').pay({ amountDebit: 10 });
            const b = initialize(credentialsB);
            const sendB = capture(b);

            await Promise.resolve();
            await pending.request();

            expectSignedBy(sendA, credentialsA);
            expect(sendB).not.toHaveBeenCalled();
            expect(JSON.parse(JSON.stringify(sendA.mock.calls[0][1]))).toMatchObject({
                Currency: 'EUR',
                PushURL: 'https://store-a.example/push',
            });
        });

        test('retained batch and transaction helpers, subscriptions and credential checks use their client', async () => {
            const a = initialize();
            const sendA = capture(a);
            const batch = a.batch;
            const transaction = a.transaction('transaction-a');
            const sendB = capture(initialize(credentialsB));

            await batch.transaction([{ amountDebit: 10, currency: 'EUR' }]).request();
            await batch.data().request();
            await transaction.status();
            await transaction.refundInfo();
            await transaction.cancelInfo();
            expect(await a.getActiveSubscriptions()).toEqual([]);
            expect(await a.confirmCredentials()).toBe(true);

            expect(sendA).toHaveBeenCalledTimes(7);
            expectSignedBy(sendA, credentialsA);
            expect(sendB).not.toHaveBeenCalled();
        });

        test('standalone helpers capture the default client when created', async () => {
            const a = initialize();
            const sendA = capture(a);
            const request = Request.Transaction({ amountDebit: 1, currency: 'EUR' });
            const builder = getMethod('mastercard');
            const transaction = new TransactionService('transaction-a');
            const subscriptions = new ActiveSubscriptions();
            const sendB = capture(initialize(credentialsB));

            await request.request();
            await builder.pay({ amountDebit: 2 }).request();
            await transaction.status();
            await subscriptions.get();

            expect(sendA).toHaveBeenCalledTimes(4);
            expectSignedBy(sendA, credentialsA);
            expect(sendB).not.toHaveBeenCalled();
        });

        test('directly constructed clients keep their timeout and HTTPS agent', async () => {
            const agent = new Agent();
            const a = new Buckaroo(credentialsA, { mode: 'TEST', currency: 'EUR', timeout: 1234 }, agent);
            const sendB = capture(initialize(credentialsB));
            const adapter = jest.fn(async (config) => ({
                data: {},
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
            }));

            await a.method('mastercard').pay({ amountDebit: 10 }).request({ adapter });

            expect(adapter).toHaveBeenCalledTimes(1);
            expect(adapter.mock.calls[0][0]).toMatchObject({ timeout: 1234, httpsAgent: agent });
            expect(adapter.mock.calls[0][0].headers.Authorization).toMatch(/^hmac store-a:/);
            expect(sendB).not.toHaveBeenCalled();
            agent.destroy();
        });

        test('standalone credential confirmation checks its own credentials', async () => {
            initialize(credentialsB);
            const send = jest
                .spyOn(HttpsClient.prototype, 'sendRequest')
                .mockResolvedValue({ httpResponse: { status: 200 } } as any);

            expect(await new Credentials(credentialsA.secretKey, credentialsA.websiteKey).confirm()).toBe(true);
            expectSignedBy(send, credentialsA);
        });

        test('a single initialized client still sends ordinary payments', async () => {
            const a = initialize();
            const send = capture(a);
            await a.method('mastercard').pay({ amountDebit: 10 }).request();
            expectSignedBy(send, credentialsA);
        });

        test('serializing requests, builders and services does not expose client credentials', () => {
            const a = initialize();
            const builder = a.method('mastercard');
            for (const value of [
                builder,
                builder.pay({ amountDebit: 10 }),
                a.transaction('transaction-a'),
                new ActiveSubscriptions(),
            ]) {
                const serialized = JSON.stringify(value);
                expect(serialized).not.toContain(credentialsA.secretKey);
                expect(serialized).not.toContain('secretKey');
            }
        });
    });
});

afterEach(() => {
    if (recordedRequests().length) expect(recordedRequests()).toMatchSnapshot();
});
