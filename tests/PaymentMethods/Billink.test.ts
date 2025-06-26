import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay';
import buckarooClientTest from '../BuckarooClient.test';
import { IRequest, RecipientCategory, uniqid } from '../../src';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { IRefund } from '../../src/PaymentMethods/Billink/Models/Refund';

let payTransactionKey: string;
let authorizeTransactionKey: string;
let method = buckarooClientTest.method('billink');
let payload: IPay;

beforeEach(() => {
    method = buckarooClientTest.method('billink');
    payload = createBasePayload<IPay>(
        {
            trackandtrace: 'ABC123',
            VATNumber: 'NLXXXXXXXXXXB01',
        },
        {
            billing: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            shipping: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory'],
            },
        }
    );
});

describe('Billink methods', () => {
    test('Pay', async () => {
        const response = await method.pay(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        payTransactionKey = response.getTransactionKey();
    });
    test('Authorize', async () => {
        const response = await method.authorize(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        authorizeTransactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        expect(payTransactionKey).toBeDefined();
        const response = await method
            .refund(
                createRefundPayload<IRefund>({
                    originalTransactionKey: payTransactionKey,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        expect(authorizeTransactionKey).toBeDefined();

        const response = await method
            .cancelAuthorize(
                createRefundPayload<IRefund>({
                    originalTransactionKey: authorizeTransactionKey,
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        // const authResponse = await method.authorize(payload).request();
        // expect(authResponse.isSuccess()).toBeTruthy();
        // let key = authResponse.getTransactionKey();
        // expect(key).toBeDefined();

        // new Promise((resolve) => setTimeout(resolve, 6000));

        const response = await method
            .capture({
                ...payload,
                originalTransactionKey: '1234',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
