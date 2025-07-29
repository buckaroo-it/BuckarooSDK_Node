import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'payconiq'>;

beforeEach(() => {
    method = buckarooClientTest.method('payconiq');
});

describe('Payconiq', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                order: uniqid(),
            })
            .request();
        expect(response.isPendingProcessing).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '93FA5B31D80C489BB0822A3BD8037D6E',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('InstantRefund', async () => {
        const response = await method
            .instantRefund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '93FA5B31D80C489BB0822A3BD8037D6E',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
