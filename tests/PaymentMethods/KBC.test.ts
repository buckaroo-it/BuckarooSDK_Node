import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'KBCPaymentButton'>;

beforeEach(() => {
    method = buckarooClientTest.method('KBCPaymentButton');
});
describe('Testing KBC methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'F662726FCA4C4B609A6283DB686B1312',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
