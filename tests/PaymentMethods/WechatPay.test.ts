import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('wechatpay');
describe('WechatPay', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                locale: 'en-US',
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeDefined();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((response) => {
                expect(response.data).toBeDefined();
            });
    });
});
