import Gender from '../../src/Constants/Gender';
import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('payperemail');

describe('PayPerEmail methods', () => {
    test('paymentInvitation', async () => {
        await method
            .paymentInvitation({
                currency: 'EUR',
                amountDebit: 100,
                order: uniqid(),
                invoice: uniqid(),
                merchantSendsEmail: false,
                email: 'test@buckaroo.nl',
                expirationDate: '2030-01-01',
                paymentMethodsAllowed: 'ideal,mastercard,paypal',
                attachment: '',
                customer: {
                    gender: Gender.FEMALE,
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                },
            })
            .request()
            .then((response) => {
                expect(response).toBeDefined();
            });
    });
});
