import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay';
import buckarooClientTest from '../BuckarooClient.test';
import RecipientCategory from '../../src/Constants/RecipientCategory';
import { uniqid } from '../../src/Utils/Functions';

const method = buckarooClientTest.method('billink');

describe('Billink methods', () => {
    const invoiceId = uniqid();

    test('Pay', async () => {
        await method
            .manually()
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Authorize', async () => {
        await method.authorize({ ...payload, invoice: invoiceId }).then((data) => {
            expect(data.isSuccess()).toBeTruthy();
        });
    });
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: payload.amountDebit,
                invoice: invoiceId,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                invoice: invoiceId,
                amountDebit: payload.amountDebit,
                articles: payload.articles,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});

const payload: IPay = {
    amountDebit: 100,
    trackAndTrace: 'XXXXXXXXXXXXX',
    vatNumber: 'NLXXXXXXXXXXB01',
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'Test Acceptatie',
            title: 'Female',
            initials: 'TA',
            firstName: 'Test',
            lastName: 'Acceptatie',
            birthDate: '01-01-1990',
            chamberOfCommerce: 'XXXXXX41',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '80',
            houseNumberAdditional: 'a',
            zipcode: '8441ER',
            city: 'Heerenveen',
            country: 'NL',
        },
        phone: {
            mobile: '0612345678',
            landline: '0201234567',
        },
        email: 'test@buckaroo.nl',
    },
    shipping: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'Test Acceptatie',
            title: 'Male',
            initials: 'TA',
            firstName: 'Test',
            lastName: 'Acceptatie',
            birthDate: '1990-01-01',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '80',
            houseNumberAdditional: 'a',
            zipcode: '8441ER',
            city: 'Heerenveen',
            country: 'NL',
        },
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            description: 'Blue Toy Car',
            vatPercentage: 21,
            quantity: 2,
            price: 20.1,
            priceExcl: 5,
        },
        {
            identifier: 'Articlenumber2',
            description: 'Red Toy Car',
            vatPercentage: 21,
            quantity: 1,
            price: 10.1,
            priceExcl: 5,
        },
    ],
};
