import buckarooClientTest from '../BuckarooClient.test';
import { getIPAddress, RecipientCategory, uniqid } from '../../src';
import { IPay } from '../../src/PaymentMethods/In3/Models/Pay';

const in3 = buckarooClientTest.method('In3');

describe('Testing In3 methods', () => {
    test('Pay', async () => {
        return in3
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isPendingProcessing()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        return in3
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeFalsy();
            });
    });
});

const payload: IPay = {
    amountDebit: 100,
    description: 'in3 pay',
    order: uniqid(),
    invoice: uniqid(),
    clientIP: getIPAddress(),
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            initials: 'TA',
            firstName: 'Test',
            lastName: 'Acceptatie',
            birthDate: '1990-01-01',
            customerNumber: 'XXXXX',
            companyName: 'Buckaroo B.V.',
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
        },
        email: 'test@buckaroo.nl',
    },
    shipping: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'J',
            firstName: 'Test',
            lastName: 'Acceptatie',
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
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            type: 'Physical',
            description: 'Blue Toy Car',
            category: 'test product',
            vatPercentage: 21,
            quantity: 2,
            price: 25,
        },
        {
            identifier: 'Articlenumber2',
            type: 'Physical',
            description: 'Red Toy Car',
            category: 'test product',
            vatPercentage: 21,
            quantity: 1,
            price: 25,
        },
        {
            identifier: 'USPShippingID',
            type: 'Physical',
            description: 'UPS',
            category: 'test product',
            vatPercentage: 21,
            quantity: 1,
            price: 25,
        },
    ],
};
