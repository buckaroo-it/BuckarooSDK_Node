import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Klarna/Models/Pay';
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
        const clonedPayload = JSON.parse(JSON.stringify(payload));
        clonedPayload.currency = 'GBP';
        clonedPayload.billing.address.country = 'GB';
        await klarna
            .payInInstallments(clonedPayload)
            .request()
            .then((res) => {
                expect(res).toBeDefined();
            });
    });
});

let payload: IPay = {
    amountDebit: 100,
    invoice: uniqid(),
    order: uniqid(),
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            gender: 'female',
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
        phone: {
            mobile: '0612345678',
        },
        email: 'test@buckaroo.nl',
    },
    shipping: {
        recipient: {
            category: RecipientCategory.COMPANY,
            gender: 'male',
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
        email: 'test@buckaroo.nl',
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            description: 'Blue Toy Car',
            vatPercentage: 21,
            quantity: 2,
            price: 20.1,
        },
        {
            identifier: 'Articlenumber2',
            description: 'Red Toy Car',
            vatPercentage: 21,
            quantity: 1,
            price: 10.1,
        },
    ],
};
