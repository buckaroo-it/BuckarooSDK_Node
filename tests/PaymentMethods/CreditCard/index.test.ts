import { PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let visa: PaymentMethodInstance<'visa'>;
let mastercard: PaymentMethodInstance<'mastercard'>;
let transactionKey = 'test-transactionKey';
let authorizationKey = 'test-authorizationKey';

beforeEach(() => {
    transactionKey = 'test-transactionKey';
    authorizationKey = 'test-authorizationKey';
    visa = buckarooClientTest.method('visa');
    mastercard = buckarooClientTest.method('mastercard');
});

describe('testing methods', () => {
    test('Pay', async () => {
        mockResponse(transactionResponse(790));

        const response = await visa
            .pay({
                amountDebit: 100,
                startRecurrent: true,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        mockResponse(transactionResponse(190));

        const response = await visa
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'DFD5107223F742F5B9A0431E52C1ADA7',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Authorize', async () => {
        mockResponse(transactionResponse(790));

        const response = await visa
            .authorize({
                amountDebit: 100,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
        authorizationKey = response.getTransactionKey();
    });
    test('PayEncrypted', async () => {
        mockResponse(transactionResponse(791));

        const response = await mastercard
            .payEncrypted({
                amountDebit: 100,
                name: 'Mastercard',
                encryptedCardData:
                    '001u8gJNwngKubFCO6FmJod6aESlIFATkKYaj47KlgBp7f3NeVxUzChg1Aug7WD2vc5wut2KU9NPLUaO0tFmzhVLZoDWn7dX4AzGxSjPrsPmDMWYcEkIwMZfcyJqoRfFkF3j15mil3muXxhR1a609NfkTo11J3ENVsvU3k60z+x0jCw6NjzbrweVQhBRkrbs7TBJkS4tR38JiDsXyH2E1JmRHE+o2P9qz4at6w3zggmwImvjt5IIjEr6g8KfsIDXfv7YjEzhJ3P+7uuGoyG2WYm/Pr0+iEmTj5Q/ijkxu1+cDqv5eiB+80KgffPItUZDrnv9sKlVBAr+f53nm1G+Sxp0Q==',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('PayWithSecurityCode', async () => {
        mockResponse(transactionResponse(791));

        const response = await mastercard
            .payWithSecurityCode({
                amountDebit: 100,
                originalTransactionKey: '24F4BD71AAF843089C914135101F061A',
                encryptedSecurityCode:
                    '001F3AJT7wkJa04zE8c78P7spOAgHSKH1YKgPlOwXhW049VfIXMwZO32RYna9xZRyUCtfODIoCL8GRQoaZbStlBT4rbF5e4PPvWFSKdvua4rq+GQDNAghfa+ZQz0BzBPfjS0WBdFape9n3zH2vC/0m+wI3QZiDpYYgyWC1/Y3udJDU7JRTVMq/BDHGet+IZ2CDnkeGl813kkYymzYon/QeuQRQ0Wsec5bmVQNYGx62fz70/vLgs0ffff+6DtZtnZWfByRkTwMNebJotlOsSkbhVR5FrHpAbNPCJI+LvJcJL7Eoo+ZuX5/LWGmsT6qnR/uLiIw1DI7mTKGy6/P7IljAE+g==',
                name: 'Mastercard',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    // "Technical failure"
    test('AuthorizeWithSecurityCode', async () => {
        mockResponse(transactionResponse(791));

        const response = await mastercard
            .authorizeWithSecurityCode({
                amountDebit: 100,
                originalTransactionKey: '24F4BD71AAF843089C914135101F061A',
                encryptedSecurityCode:
                    '001F3AJT7wkJa04zE8c78P7spOAgHSKH1YKgPlOwXhW049VfIXMwZO32RYna9xZRyUCtfODIoCL8GRQoaZbStlBT4rbF5e4PPvWFSKdvua4rq+GQDNAghfa+ZQz0BzBPfjS0WBdFape9n3zH2vC/0m+wI3QZiDpYYgyWC1/Y3udJDU7JRTVMq/BDHGet+IZ2CDnkeGl813kkYymzYon/QeuQRQ0Wsec5bmVQNYGx62fz70/vLgs0ffff+6DtZtnZWfByRkTwMNebJotlOsSkbhVR5FrHpAbNPCJI+LvJcJL7Eoo+ZuX5/LWGmsT6qnR/uLiIw1DI7mTKGy6/P7IljAE+g==',
                name: 'Mastercard',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('AuthorizeEncrypted', async () => {
        mockResponse(transactionResponse(791));

        const response = await mastercard
            .authorizeEncrypted({
                amountDebit: 100,
                encryptedCardData:
                    '001u8gJNwngKubFCO6FmJod6aESlIFATkKYaj47KlgBp7f3NeVxUzChg1Aug7WD2vc5wut2KU9NPLUaO0tFmzhVLZoDWn7dX4AzGxSjPrsPmDMWYcEkIwMZfcyJqoRfFkF3j15mil3muXxhR1a609NfkTo11J3ENVsvU3k60z+x0jCw6NjzbrweVQhBRkrbs7TBJkS4tR38JiDsXyH2E1JmRHE+o2P9qz4at6w3zggmwImvjt5IIjEr6g8KfsIDXfv7YjEzhJ3P+7uuGoyG2WYm/Pr0+iEmTj5Q/ijkxu1+cDqv5eiB+80KgffPItUZDrnv9sKlVBAr+f53nm1G+Sxp0Q==',
                name: 'Mastercard',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        mockResponse(transactionResponse(190));

        const response = await visa
            .cancelAuthorize({
                originalTransactionKey: 'F5E4DEEF89594E85A7DC7244180FAF89',
                amountCredit: 100,
                name: 'Visa',
                invoice: uniqid(),
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        mockResponse(transactionResponse(190));

        const response = await visa
            .capture({
                originalTransactionKey: '5DD1E0DE29CB4E4F91B477983AB375CD',
                amountDebit: 100,
                name: 'Visa',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('PayRecurrent', async () => {
        mockResponse(transactionResponse(190));

        const response = await visa
            .payRecurrent({
                originalTransactionKey: 'B10DF7D5E6314A528BBA7BDF297EB21E',
                amountDebit: 100,
                name: 'Visa',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('AuthorizeWithToken', async () => {
        mockResponse(transactionResponse(791));

        const response = await visa
            .authorizeWithToken({
                invoice: uniqid(),
                amountDebit: 10,
                name: 'Visa',
                sessionId: 'hf_457vWCGGdZcWJzBY',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('PayWithToken', async () => {
        mockResponse(transactionResponse(790));

        const response = await visa
            .payWithToken({
                invoice: uniqid(),
                amountDebit: 10,
                name: 'Visa',
                sessionId: 'hf_457vWCGGdZcWJzBY',
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('payRemainderEncrypted builds the PayRemainderEncrypted request', async () => {
    mockResponse(transactionResponse(), '/json/Transaction');
    const result = await mastercard
        .payRemainderEncrypted({ amountDebit: 10, encryptedCardData: 'synthetic-card' })
        .request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'PayRemainderEncrypted' })]),
                },
            }),
        }),
    ]);
});
