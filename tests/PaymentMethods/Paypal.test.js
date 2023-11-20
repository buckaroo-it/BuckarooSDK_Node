import buckarooClientTest from '../BuckarooClient.test';
require('../BuckarooClient.test');
import Paypal from '../../src/PaymentMethods/Paypal';
const method = new Paypal('paypal');
describe('Paypal', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 50.3
        })
            .request()
            .then((info) => {
            expect(info.data).toBeDefined();
        });
    });
    test('Refund', async () => {
        await method
            .refund({
            amountCredit: 50.3,
            originalTransactionKey: '123456'
        })
            .request()
            .then((info) => {
            expect(info.data).toBeDefined();
        });
    });
    test('ExtraInfo', async () => {
        buckarooClientTest.method('subscriptions').createCombined({});
        await method
            .extraInfo({
            amountDebit: 50.3,
            address: {
                street: 'Hoofstraat 90',
                street2: 'Street 2',
                city: 'Heerenveen',
                state: 'Friesland',
                zipcode: '8441AB',
                country: 'NL'
            },
            addressOverride: false,
            costumer: { name: 'John' },
            noShipping: '0',
            phone: { mobile: '0612345678' }
        })
            .request()
            .then((info) => {
            expect(info.data).toBeDefined();
        });
    });
});
