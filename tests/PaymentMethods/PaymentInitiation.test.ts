import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('PayByBank');

describe('PaymentInitiation methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                issuer: 'RABONL2U',
                amountDebit: 100,
                order: uniqid(),
                invoice: uniqid(),
                countryCode: 'NL',
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined();
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
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
});
