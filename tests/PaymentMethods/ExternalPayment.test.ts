import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'externalpayment'>;
let transactionKey: string;

beforeEach(() => {
    method = buckarooClientTest.method('externalpayment');
});
describe('Testing ExternalPayment methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 10,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });
    test('Refund', async () => {
        expect(transactionKey).toBeDefined();
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: transactionKey,
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
