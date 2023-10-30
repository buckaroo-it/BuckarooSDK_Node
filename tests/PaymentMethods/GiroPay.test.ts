import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('giropay');
describe('Testing Giropay methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                bic: 'XXXXXXXXX',
                amountDebit: 100,
            })
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 0.01,
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
