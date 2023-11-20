import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';
import RecipientCategory from '../../src/Constants/RecipientCategory';
const in3 = buckarooClientTest.method('In3');
describe('Testing In3 methods', () => {
    test('Pay', async () => {
        await in3
            .pay(payload)
            .request()
            .then((data) => {
            expect(data.isPendingProcessing()).toBeTruthy();
        });
    });
    test('Refund', async () => {
        await in3
            .refund({
            amountCredit: 42,
            originalTransactionKey: '',
            merchantImageUrl: '',
            summaryImageUrl: '',
            articles: []
        })
            .request()
            .then((data) => {
            expect(data.isSuccess()).toBeFalsy();
        });
    });
});
const payload = {
    amountDebit: 52.3,
    description: 'in3 pay',
    order: uniqid(),
    invoice: uniqid(),
    clientIP: '127.0.0.1',
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            initials: 'J',
            firstName: 'John',
            lastName: 'Dona',
            birthDate: '1990-01-01',
            customerNumber: '12345',
            companyName: 'Buckaroo',
            chamberOfCommerce: '123456'
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '13',
            houseNumberAdditional: 'a',
            zipcode: '1234AB',
            city: 'Heerenveen',
            country: 'NL'
        },
        phone: {
            mobile: '0698765433'
        },
        email: 'test@buckaroo.nl'
    },
    shipping: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'J',
            firstName: 'John',
            lastName: 'Dona',
            chamberOfCommerce: '123456'
        },
        address: {
            street: 'Kalverstraat',
            houseNumber: '13',
            houseNumberAdditional: 'b',
            zipcode: '4321EB',
            city: 'Amsterdam',
            country: 'NL'
        }
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            type: 'Physical',
            description: 'Blue Toy Car',
            category: 'test product',
            vatPercentage: 21,
            quantity: 2,
            price: 20.1
        },
        {
            identifier: 'Articlenumber2',
            type: 'Physical',
            description: 'Red Toy Car',
            category: 'test product',
            vatPercentage: 21,
            quantity: 1,
            price: 10.1
        },
        {
            identifier: 'USPShippingID',
            type: 'Physical',
            description: 'UPS',
            category: 'test product',
            vatPercentage: 21,
            quantity: 1,
            price: 2
        }
    ]
};
