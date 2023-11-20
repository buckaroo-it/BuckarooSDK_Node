import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const payconiq = buckarooClientTest.method('payconiq');
describe('Payconiq', () => {
    test('Pay', async () => {
        await payconiq
            .pay({
                amountDebit: 100,
                order: uniqid(),
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
    test('Refund', async () => {
        await payconiq
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
    test('InstantRefund', async () => {
        await payconiq
            .instantRefund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
