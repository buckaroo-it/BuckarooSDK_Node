import { Gender, getIPAddress, IRefundRequest, RequestTypes, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/AfterpayDigiAccept/Model/Pay';
import { createBasePayload, createRefundPayload } from '../Payloads';

const method = buckarooClientTest.method('afterpaydigiaccept');

const payload = createBasePayload<IPay>(
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

describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        return method
            .authorize(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('CancelAuthorize', async () => {
        return method
            .cancelAuthorize(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'F1924C34B80D4CA6838F44D6A8A6516A',
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
                originalTransactionKey: '4FFF55350BAF47F086F75CC693407823',
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Pay', async () => {
        return method
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '5DA00BD4ED4B4AE8B6C0092E138D959B',
                    amountCredit: payload.amountDebit,
                })
            )
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Specification', async () => {
        return method
            .specification(RequestTypes.Transaction)
            .request()
            .then((data) => {
                console.log(data);
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
