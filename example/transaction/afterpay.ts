import buckarooClient from '../buckarooClient';
import { RecipientCategory, getIPAddress } from '../../src';

const afterpay = buckarooClient.method('afterpay');

//Pay
afterpay
    .pay({
        invoice: 'Riverty Pay',
        clientIP: getIPAddress(),
        amountDebit: 100,
        billing: {
            recipient: {
                category: RecipientCategory.PERSON,
                firstName: 'Test',
                lastName: 'Acceptatie',
                birthDate: '01-01-1990',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
                zipcode: '8441ER',
                city: 'Heerenveen',
                country: 'NL',
            },
            email: 'test@buckaroo.nl',
            phone: {
                mobile: '0612345678',
                landline: '0201234567',
            },
        },
        articles: [
            {
                vatPercentage: 21,
                price: 10,
                description: 'Test',
                quantity: 4,
                identifier: 'test',
            },
        ],
    })
    .request();
//Refund
afterpay
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Riverty refund',
    })
    .request();
//Authorize
afterpay
    .authorize({
        invoice: 'Riverty Pay',
        clientIP: getIPAddress(),
        amountDebit: 100,
        billing: {
            recipient: {
                category: RecipientCategory.PERSON,
                firstName: 'Test',
                lastName: 'Acceptatie',
                birthDate: '01-01-1990',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
                zipcode: '8441ER',
                city: 'Heerenveen',
                country: 'NL',
            },
            email: 'test@buckaroo.nl',
            phone: {
                mobile: '0612345678',
                landline: '0201234567',
            },
        },
        articles: [
            {
                vatPercentage: 21,
                price: 10,
                description: 'Test',
                quantity: 4,
                identifier: 'test',
            },
        ],
    })
    .request();
