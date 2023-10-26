import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

require('../BuckarooClient.test');

const method = buckarooClientTest.method('sofortueberweisung');

describe('Sofort', () => {
    test('Pay', async () => {
        return await method
            .pay({
                amountDebit: 100,
                order: uniqid(),
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info).toBeDefined();
            });
    });

    test('InstantRefund', async () => {
        await method
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
