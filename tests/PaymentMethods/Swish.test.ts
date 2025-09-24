import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'swish'>;

beforeEach(() => {
    method = buckarooClientTest.method('swish');
});

describe('Swish methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                currency: 'SEK',
                amountDebit: 10,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test.only('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    currency: 'SEK',
                    originalTransactionKey: '571519D5237B40D884B6D95245ED953B',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
