import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, uniqid } from '../../src';

let method: PaymentMethodInstance<'boekenbon'>;
let transactionKey: string;

beforeEach(() => {
    method = buckarooClientTest.method('boekenbon');
});
describe('GiftCard methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 10,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });

    test('Pay Reminder', async () => {
        const response = await method
            .pay({
                amountDebit: 50,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();

        let relatedTransactionKey = response?.data?.relatedTransactions?.[0].relatedTransactionKey || '';
        const responseRemainderPay = await method
            .payRemainder({
                amountDebit: 40,
                intersolveCardnumber: '0000000000000000001',
                intersolvePIN: '1000',
                originalTransactionKey: relatedTransactionKey,
            })
            .request();
        expect(responseRemainderPay.isSuccess()).toBeTruthy();
    });

    test('Refund', async () => {
        expect(transactionKey).toBeDefined();
        const response = await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: transactionKey,
                email: 'test@buckaroo.nl',
                lastName: 'Acceptatie',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
