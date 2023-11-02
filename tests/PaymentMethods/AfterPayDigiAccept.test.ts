import { Gender, getIPAddress, RequestTypes, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/AfterpayDigiAccept/Model/Pay';

const method = buckarooClientTest.method('afterpaydigiaccept');

const paymentPayload: IPay = {
    amountDebit: 100,
    order: uniqid(),
    invoice: uniqid(),
    b2b: true,
    addressesDiffer: true,
    customerIPAddress: getIPAddress(),
    shippingCosts: 0.5,
    costCentre: 'Test',
    department: 'Test',
    establishmentNumber: 123456,
    billing: {
        recipient: {
            gender: Gender.FEMALE,
            initials: 'AB',
            lastName: 'Acceptatie',
            birthDate: '1990-01-01',
            culture: 'NL',
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
            culture: 'NL',
            gender: Gender.MALE,
            initials: 'TA',
            lastName: 'Acceptatie',
            companyName: 'Buckaroo B.V.',
            chamberOfCommerce: 'XXXXXX41',
            birthDate: '1990-01-01',
            vatNumber: 'NLXXXXXXXXXXB01',
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
    articles: [
        {
            identifier: uniqid(),
            description: 'Blue Toy Car',
            price: 10.0,
            quantity: 2,
            vatCategory: '1',
        },
        {
            identifier: uniqid(),
            description: 'Red Toy Car',
            price: 10.0,
            quantity: 2,
            vatCategory: '1',
        },
    ],
};
describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        await method
            .authorize(paymentPayload)
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Pay', async () => {
        await method
            .pay(paymentPayload)
            .request()
            .then((data) => {
                expect(data.data).toBeDefined();
            });
    });
    test('Specification', async () => {
        await method
            .specification(RequestTypes.Transaction)
            .request()
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});