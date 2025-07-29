import { getIPAddress, IRefundRequest, PaymentMethodInstance, RequestTypes } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/AfterpayDigiAccept/Model/Pay';
import { createBasePayload, createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'afterpaydigiaccept'>;
let payload: IPay;

beforeEach(() => {
    method = buckarooClientTest.method('afterpaydigiaccept');
    payload = createBasePayload<IPay>(
        {
            addressesDiffer: true,
            customerIPAddress: getIPAddress(),
            shippingCosts: 0.5,
            costCentre: 'Test',
            department: 'Test',
            establishmentNumber: 123456,
        },
        {
            billing: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            shipping: {
                exclude: ['state', 'culture', 'gender', 'lastNamePrefix', 'placeOfBirth'],
            },
            articles: {
                exclude: ['type', 'unitCode', 'vatCategory', 'vatPercentage'],
            },
        }
    );
});

describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        const response = await method.authorize(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        const response = await method
            .cancelAuthorize(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'F1924C34B80D4CA6838F44D6A8A6516A',
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
                originalTransactionKey: '4FFF55350BAF47F086F75CC693407823',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pay', async () => {
        const response = await method.pay(payload).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '5DA00BD4ED4B4AE8B6C0092E138D959B',
                    amountCredit: payload.amountDebit,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Specification', async () => {
        const response = await method.specification(RequestTypes.Transaction).request();
        expect(response.httpResponse.status).toEqual(200);
    });
});
