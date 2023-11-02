import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('KBCPaymentButton');

describe('Testing KBC methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
            })
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
