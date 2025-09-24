import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'bizum'>;

beforeEach(() => {
    method = buckarooClientTest.method('bizum');
});

describe('Bizum methods', () => {
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
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'E67675BFA22D4198A0BE5889XXXXXXXX',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
