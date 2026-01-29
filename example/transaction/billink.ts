import buckarooClient from '../buckarooClient';
import { RecipientCategory } from '../../src';

const billink = buckarooClient.method('billink');

//Pay
billink
    .pay({
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
    })
    .request();

//Refund
billink
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Billink Refund',
    })
    .request();
