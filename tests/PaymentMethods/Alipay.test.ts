import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const alipay = buckarooClientTest.method('alipay');

describe('Alipay methods', () => {
    test('Pay Simple Payload', async () => {
        await alipay
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
        await alipay
            .refund({
                amountCredit: 0.01,
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
});
