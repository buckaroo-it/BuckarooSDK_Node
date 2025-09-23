import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'bizum'>;

beforeEach(() => {
    method = buckarooClientTest.method('bizum');
});

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
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
                    originalTransactionKey: 'E67675BFA22D4198A0BE5889XXXXXXXX',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
