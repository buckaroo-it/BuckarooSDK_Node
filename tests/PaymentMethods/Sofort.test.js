require('../BuckarooClient.test');
import Sofort from '../../src/PaymentMethods/Sofort';
const method = new Sofort();
describe('Sofort', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 50.3,
            order: '123456'
        })
            .then((info) => {
            expect(info).toBeDefined();
        });
    });
    test('Refund', async () => {
        await method
            .refund({
            amountCredit: 50.3,
            originalTransactionKey: '123456'
        })
            .then((info) => {
            expect(info).toBeDefined();
        });
    });
    test('InstantRefund', async () => {
        await method
            .instantRefund({
            amountCredit: 4.23,
            originalTransactionKey: '97DC0A03BBDF4DAAAC694D7FEC8785E1'
        })
            .then((data) => {
            expect(data).toBeDefined();
        });
    });
});
