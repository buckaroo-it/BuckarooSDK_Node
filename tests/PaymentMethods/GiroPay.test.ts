import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('giropay');
describe('Testing Giropay methods', () => {
    test('Pay', async () => {
        return method
            .pay({
                bic: 'XXXXXXXXX',
                amountDebit: 100,
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return method
            .refund({
                amountCredit: 0.01,
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy();
            });
    });
});
