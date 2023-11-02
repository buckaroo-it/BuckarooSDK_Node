import buckarooClientTest from '../BuckarooClient.test';
import { Gender, getIPAddress, RecipientCategory, uniqid } from '../../src';

const capayable = buckarooClientTest.method('capayable');

describe('Testing capayable methods', () => {
    test('Pay', async () => {
        await capayable
            .pay(paymentPayload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy();
            });
    });
    test('Refund', async () => {
        await capayable
            .refund({
                invoice: uniqid(),
                amountCredit: paymentPayload.amountDebit,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .request()
            .then((data) => {
                expect(data.isFailed()).toBeTruthy();
            });
    });
    test('PayInInstallments', async () => {
        await capayable
            .payInInstallments(paymentPayload)
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy();
            });
    });
});

const paymentPayload = {
    clientIP: getIPAddress(),
    description: 'Test',
    amountDebit: 100,
    customerType: RecipientCategory.COMPANY,
    invoiceDate: '22-01-2018',
    customer: {
        gender: Gender.FEMALE,
        culture: 'nl-NL',
        initials: 'TA',
        lastName: 'Acceptatie',
        birthDate: '1990-01-01',
    },
    company: {
        companyName: 'Buckaroo B.V.',
        chamberOfCommerce: 'XXXXXX41',
    },
    address: {
        street: 'Hoofdstraat',
        houseNumber: '80',
        houseNumberSuffix: 'a',
        zipcode: '8441ER',
        city: 'Heerenveen',
        country: 'NL',
    },
    email: 'test@buckaroo.nl',
    phone: {
        mobile: '0612345678',
    },
    articles: [
        {
            identifier: '64381664f2f8b',
            price: 10,
            quantity: 1,
            description: 'Blue Toy Car',
        },
    ],
    subtotals: [
        {
            name: 'Verzendkosten',
            value: 2,
        },
    ],
};
