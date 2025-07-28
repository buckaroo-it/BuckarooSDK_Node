import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'knaken'>;

beforeEach(() => {
    method = buckarooClientTest.method('knaken');
});

describe('Knaken', () => {
    // The transaction was rejected during processing by Unauthorized..
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 0.01,
                invoice: uniqid(),
                CustomerName: 'Rico',
                returnURL: 'https://example.com/buckaroo/return',
                returnURLCancel: 'https://example.com/buckaroo/cancel',
                returnURLError: 'https://example.com/buckaroo/error',
                returnURLReject: 'https://example.com/buckaroo/reject',
                pushURL: 'https://example.com/buckaroo/push',
                pushURLFailure: 'https://example.com/buckaroo/push-failure',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
