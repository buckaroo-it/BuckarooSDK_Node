import buckarooClientTest from "../BuckarooClient.test";
const method = buckarooClientTest.method('wechatpay');
describe('WechatPay', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 3.5,
            locale: 'en-US'
        }).request()
            .then((response) => {
            expect(response.isPendingProcessing()).toBeDefined();
        });
    });
    test('Refund', async () => {
        await method
            .refund({
            amountCredit: 3.5,
            originalTransactionKey: '1234567890'
        }).request()
            .then((response) => {
            expect(response.data).toBeDefined();
        });
    });
});
