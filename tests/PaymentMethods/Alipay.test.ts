import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest } from '../../src';
import { createRefundPayload } from '../Payloads';

describe('Alipay methods', () => {
    test('Pay Simple Payload', async () => {
        return buckarooClientTest
            .method('alipay')
            .pay({
                amountDebit: 100,
                useMobileView: false,
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return buckarooClientTest
            .method('alipay')
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: '6CE35062C16C4F47A49314D533E9F7A3',
                })
            )
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
});
