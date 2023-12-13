import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay';
import { getIPAddress, RecipientCategory, uniqid } from '../../src';

const paymentPayload: IPay = {
    invoice: uniqid(),
    clientIP: getIPAddress(),
    amountDebit: 100,
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            firstName: 'Test',
            lastName: 'Acceptatie',
            birthDate: '01-01-1990',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '80',
            zipcode: '8441ER',
            city: 'Heerenveen',
            country: 'NL',
        },
        email: 'test@buckaroo.nl',
        phone: {
            mobile: '0612345678',
            landline: '0201234567',
        },
    },
    articles: [
        {
            vatPercentage: 21,
            price: 10,
            description: 'Test',
            quantity: 4,
            identifier: 'test',
        },
    ],
};

const method = buckarooClientTest.method('afterpay');
describe('AfterPay methods', () => {
    test('Pay', async () => {
        return method
            .pay(paymentPayload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return method
            .refund({
                invoice: paymentPayload.invoice, //Set invoice number of the transaction to refund
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', //Set transaction key of the transaction to refund
                amountCredit: paymentPayload.amountDebit,
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeDefined();
            });
    });
    test('Authorize', async () => {
        return method
            .authorize(paymentPayload)
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('CancelAuthorize', async () => {
        return method
            .cancelAuthorize({
                invoice: paymentPayload.invoice,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 100,
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
    test('Capture', async () => {
        return method
            .capture({
                ...paymentPayload,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.httpResponse.status).toEqual(200);
            });
    });
});
