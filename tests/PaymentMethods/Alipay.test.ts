import buckarooClientTest from '../BuckarooClient.test';

const alipay = buckarooClientTest.method('alipay');

describe('Alipay methods', () => {
    test('Pay Simple Payload', async () => {
        await alipay
            .pay({
                amountDebit: 10,
                useMobileView: false,
            })
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await alipay
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397777A251645F8BDD81547B5005B4B',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
});
