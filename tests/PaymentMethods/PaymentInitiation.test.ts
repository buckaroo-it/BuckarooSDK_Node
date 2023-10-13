require('../BuckarooClient.test');
import PayByBank from '../../src/PaymentMethods/PayByBank';

const paymentInitiation = new PayByBank('PayByBank');

describe('PayByBank methods', () => {
    test('Pay', async () => {
        await paymentInitiation
            .pay({
                amountDebit: 50.3,
                order: '123456',
                issuer: 'INGBNL2A',
                countryCode: 'NL',
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
    test('Refund', async () => {
        await paymentInitiation
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456',
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined();
            });
    });
});
