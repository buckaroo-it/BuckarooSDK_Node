import buckarooClient from '../buckarooClient';
import { getIPAddress, RecipientCategory, uniqid } from '../../src';

const in3 = buckarooClient.method('In3');

//Pay
in3
    .pay({
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
    })
    .request();
//Refund
in3
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'In3 Refund',
    })
    .request();
