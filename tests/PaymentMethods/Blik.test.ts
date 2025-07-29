import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'blik'>;

beforeEach(() => {
    method = buckarooClientTest.method('blik');
});

describe('Testing Blik methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                currency: 'PLN',
                amountDebit: 100.0,
                invoice: 'Blik Test Plugin Example',
                description: 'Blik Test Plugin Example',
                email: 'test@buckaroo.nl',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'DA18F7031E3547E898B68773E372ACB4',
                    currency: 'PLN',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

