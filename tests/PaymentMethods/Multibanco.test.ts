import { IRefundRequest, PaymentMethodInstance } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'multibanco'>;

beforeEach(() => {
    method = buckarooClientTest.method('multibanco');
});

describe('Multibanco methods', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.30,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '3BEB1B96CE7E4ECBB68EE44BDDE7FD6F',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
