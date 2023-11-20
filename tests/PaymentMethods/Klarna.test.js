import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src/Utils/Functions';
import RecipientCategory from '../../src/Constants/RecipientCategory';
const klarna = buckarooClientTest.method('klarna');
describe('Testing Klarna methods', () => {
    test('Pay', async () => {
        await klarna
            .pay(payload)
            .request()
            .then((res) => {
            expect(res.isPendingProcessing()).toBeTruthy();
        });
    });
    test('PayInInstallments', async () => {
        await klarna
            .payInInstallments(payload)
            .request()
            .then((res) => {
            expect(res).toBeDefined();
        });
    });
});
let payload = {
    amountDebit: 50.3,
    invoice: uniqid(),
    order: uniqid(),
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            gender: 'female',
            firstName: 'John',
            lastName: 'Do',
            birthDate: '1990-01-01'
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
            category: RecipientCategory.COMPANY,
            gender: 'male',
            firstName: 'John',
            lastName: 'Do',
            birthDate: '1990-01-01'
        },
        address: {
            street: 'Kalverstraat',
            houseNumber: '13',
            houseNumberAdditional: 'b',
            zipcode: '4321EB',
            city: 'Amsterdam',
            country: 'NL'
        },
        email: 'test@buckaroo.nl'
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            description: 'Blue Toy Car',
            vatPercentage: 21,
            quantity: 2,
            price: 20.1
        },
        {
            identifier: 'Articlenumber2',
            description: 'Red Toy Car',
            vatPercentage: 21,
            quantity: 1,
            price: 10.1
        }
    ]
};
