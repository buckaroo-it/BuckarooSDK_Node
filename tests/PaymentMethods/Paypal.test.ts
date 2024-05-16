import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('paypal');

describe('Paypal', () => {
    test('Pay', async () => {
        return method
            .pay({
                amountDebit: 100,
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test('Refund', async () => {
        return method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
    test('ExtraInfo', async () => {
        buckarooClientTest.method('subscriptions').createCombined({});
        return method
            .extraInfo({
                amountDebit: 100,
                address: {
                    street: 'Hoofdstraat',
                    street2: 'Street 2',
                    city: 'Heerenveen',
                    state: 'Friesland',
                    zipcode: '8441ER',
                    country: 'NL',
                },
                addressOverride: false,
                customer: { name: 'Test Acceptatie' },
                noShipping: '0',
                phone: { mobile: '0612345678' },
            })
            .request()
            .then((info) => {
                expect(info.httpResponse.status).toEqual(200);
            });
    });
});
