import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'twint'>;

beforeEach(() => {
    method = buckarooClientTest.method('twint');
});

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                currency: 'CHF',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '1B649F2796AA466F8D8AE695XXXXXXXX',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
