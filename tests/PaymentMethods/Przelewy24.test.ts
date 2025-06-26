import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'przelewy24'>;

beforeEach(() => {
    method = buckarooClientTest.method('przelewy24');
});

describe('Przelewy24', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
                email: 'test@buckaroo.nl',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'C2D92C20BA244E02AB3CF2DE56E026F1',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
