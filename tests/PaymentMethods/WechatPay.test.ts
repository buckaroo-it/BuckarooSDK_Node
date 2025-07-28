import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance } from '../../src';
import { createRefundPayload } from '../Payloads';

let method: PaymentMethodInstance<'wechatpay'>;

beforeEach(() => {
    method = buckarooClientTest.method('wechatpay');
});

describe('WechatPay', () => {
    test('Pay', async () => {
        const response = await method
            .pay({
                amountDebit: 100.3,
                locale: 'en-US',
            })
            .request();
        expect(response.isPendingProcessing()).toBeTruthy();
    });
    test('Refund', async () => {
        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '558B0120FD64458C8ED8349FE4C0714A',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
