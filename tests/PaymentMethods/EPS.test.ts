import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, uniqid } from '../../src';

let method: PaymentMethodInstance<'eps'>;
let transactionKey: string;

beforeEach(() => {
    method = buckarooClientTest.method('eps');
});
describe('Testing Eps methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        const response = await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: transactionKey,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
