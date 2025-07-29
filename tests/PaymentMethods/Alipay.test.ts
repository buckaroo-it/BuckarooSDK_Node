import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'alipay'>;

beforeEach(() => {
    method = buckarooClientTest.method('alipay');
});

describe('Alipay methods', () => {
    test('Pay Simple Payload', async () => {
        const response = await method
            .pay({
                amountDebit: 100,
                useMobileView: false,
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '6CE35062C16C4F47A49314D533E9F7A3',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
