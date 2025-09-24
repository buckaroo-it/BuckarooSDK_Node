import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, uniqid } from '../../src';

let method: PaymentMethodInstance<'wero'>;

beforeEach(() => {
    method = buckarooClientTest.method('wero');
});

describe('Wero methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 10,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund({
                amountCredit: 10,
                invoice: uniqid(),
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Authorize', async () => {
        const response = await method
            .authorize({
                amountDebit: 10,
                invoice: uniqid(),
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('CancelAuthorize', async () => {
        const response = await method
            .cancelAuthorize({
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
                amountCredit: 10
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Capture', async () => {
        const response = await method
            .capture({
                originalTransactionKey: 'C0D904513E2D40FC826C9C76XXXXXXXX',
                amountDebit: 10,
                description: 'Test Capture Transaction',
                invoice: uniqid(),
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
