import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('przelewy24');

describe('Przelewy24', () => {
    test('Pay', async () => {
        method
            .pay({
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
                email: 'test@buckaroo.nl',
            })
            .request()
            .then((res) => {
                expect(res.isPendingProcessing()).toBeTruthy();
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
                expect(info.data).toBeDefined();
            });
    });
});
