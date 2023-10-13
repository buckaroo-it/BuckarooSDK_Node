import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay';
import RecipientCategory from '../../src/Constants/RecipientCategory';

const method = buckarooClientTest.method('afterpay')
describe('AfterPay methods', () => {
    test('Pay', () => {
        return method
            .pay(paymentPayload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: 'testinvoice 123', //Set invoice number of the transaction to refund
                originalTransactionKey: '4E8BD922192746C3918BF4077CXXXXXX', //Set transaction key of the transaction to refund
                amountCredit: 1.23,
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeDefined();
            });
    });
    test('Authorize', async () => {
        await method
            .authorize(paymentPayload)
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                invoice: 'testinvoice 123',
                originalTransactionKey: '4E8BD922192746C3918BF4077CXXXXXX',
                amountCredit: 1.23,
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });

    test('Capture', async () => {
        await method
            .capture({
                ...paymentPayload,
                originalTransactionKey: '123456789',
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('PayRemainder', async () => {
        await method
            .payRemainder({} as any)
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('AuthorizeRemainder', async () => {
        await method
            .authorizeRemainder({} as any)
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});

const paymentPayload: IPay = {
    clientIP: '127.0.0.1',
    amountDebit: 40,
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'John Smith',
            firstName: 'John',
            lastName: 'Do',
            birthDate: '1990-01-01',
            companyName: 'buckarooTest',
            conversationLanguage: 'NL',
            identificationNumber: 'IdNumber12345',
            customerNumber: 'customerNumber12345',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '13',
            houseNumberAdditional: 'a',
            zipcode: '1234AB',
            city: 'Heerenveen',
            country: 'NL',
        },
        email: 'test@buckaroo.nl',
        phone: {
            mobile: '0612345678',
            landline: '0513123456',
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
    description: 'Test',
    merchantImageUrl: 'https://www.buckaroo.nl/Themes/Buckaroo/Content/images/logo.png',
};
