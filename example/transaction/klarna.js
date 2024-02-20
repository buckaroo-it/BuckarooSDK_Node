import buckarooClient from '../buckarooClient';
import { RecipientCategory, uniqid } from '../../src';

const klarna = buckarooClient.method('klarna');

//Pay
klarna
    .pay({
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
                quantity: 1,
                price: 50,
            },
            {
                identifier: 'Articlenumber2',
                description: 'Red Toy Car',
                vatPercentage: 21,
                quantity: 1,
                price: 50,
            },
        ],
    })
    .request();
//Refund
klarna
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Klarna Refund',
    })
    .request();
