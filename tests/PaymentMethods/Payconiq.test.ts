import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const payconiq = buckarooClientTest.method('payconiq');
describe('Payconiq', () => {
    test('Pay', async () => {
        return payconiq
            .pay({
                amountDebit: 100,
                order: uniqid(),
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200)
            });
    });
    test('Refund', async () => {
        return payconiq
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200)
            });
    });
    test('InstantRefund', async () => {
        return payconiq
            .instantRefund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200)
            });
    });
});
