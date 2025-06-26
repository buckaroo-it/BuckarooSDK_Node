import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay';
import { createBasePayload, createRefundPayload } from '../Payloads';
import { IRefund } from '../../src/PaymentMethods/Afterpay/Model/Refund';

const payload = createBasePayload<IPay>(
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
const method = buckarooClientTest.method('afterpay');
describe('AfterPay methods', () => {
    test('Pay', async () => {
        return method
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Pay with Different Version', async () => {
        return method
            .setServiceVersion(2)
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return method
            .refund(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '4D2D8ABD5EA14E908F855BC7A8B10735',
                    amountCredit: payload.amountDebit,
                })
            )
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Authorize', async () => {
        return method
            .authorize(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    }); //Add 10s timeout as third param
    test('CancelAuthorize', async () => {
        return method
            .cancelAuthorize(
                createRefundPayload<IRefund>({
                    originalTransactionKey: '9CFEFC57074247DE92F7804246D1DD5D',
                    amountCredit: payload.amountDebit,
                })
            )
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Capture', async () => {
        return method
            .capture({
                ...payload,
                originalTransactionKey: 'CD1493C19B69488CB88EC6576DD1E928',
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
});
