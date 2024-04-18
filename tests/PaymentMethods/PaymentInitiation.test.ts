import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('PayByBank');

describe('PaymentInitiation methods', () => {
    test('Issuers', async () => {
        return method.issuers().then((response) => {
            expect(Array.isArray(response)).toBeTruthy();
        });
    });
    test('Pay', async () => {
        return method
            .pay({
                issuer: 'RABONL2U',
                amountDebit: 100,
                order: uniqid(),
                invoice: uniqid(),
                countryCode: 'NL',
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test('Refund', async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
});
