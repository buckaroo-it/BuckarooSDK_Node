import buckarooClient from '../buckarooClient';
import { Gender } from '../../src';

const tinka = buckarooClient.method('tinka');

//Pay
tinka
    .pay({
        billing: {
            email: 'test@buckaroo.nl',
            phone: {
                mobile: '0612345678',
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
        customer: {
            gender: Gender.MALE,
            firstName: 'Test',
            lastName: 'Acceptatie',
            initials: 'BA',
            birthDate: '1990-01-01',
        },
        amountDebit: 100,
        articles: [
            {
                type: '1',
                description: 'Blue Toy Car',
                brand: 'Ford Focus',
                manufacturer: 'Ford',
                color: 'Red',
                size: 'Small',
                quantity: 1,
                price: 100,
                unitCode: 'test',
            },
        ],
        deliveryDate: '09-07-2020',
        deliveryMethod: 'CompanyStore',
        paymentMethod: 'Credit',
    })
    .request();
//Refund
tinka
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Tinka Refund',
    })
    .request();
