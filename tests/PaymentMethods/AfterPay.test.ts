import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { IRefund } from '../../src/PaymentMethods/Afterpay/Model/Refund';
import { PaymentMethodInstance } from '../../src';

let method: PaymentMethodInstance<'afterpay'>;
let payload: IPay;

beforeEach(() => {
    method = buckarooClientTest.method('afterpay');
    payload = createBasePayload<IPay>(
        {},
        {
            billing: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'initials', 'title'],
            },
            shipping: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth', 'initials', 'title'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory'],
            },
        }
    );
});

describe('AfterPay methods', () => {
    test('Pay', async () => {
        const response = await method.pay(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pay with Different Version', async () => {
        const response = await method.setServiceVersion(2).pay(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '4D2D8ABD5EA14E908F855BC7A8B10735',
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Authorize', async () => {
        const response = await method.authorize(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        const response = await method
            .cancelAuthorize(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '9CFEFC57074247DE92F7804246D1DD5D',
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        const response = await method
            .capture({
                ...payload,
                originalTransactionKey: 'CD1493C19B69488CB88EC6576DD1E928',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
