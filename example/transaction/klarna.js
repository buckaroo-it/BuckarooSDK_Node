import buckarooClient from '../buckarooClient';
import { RecipientCategory, Gender, uniqid } from '../../src';

const klarna = buckarooClient.method('klarna');

// Reserve
klarna
    .reserve({
        amountDebit: 100.5,
        invoice: uniqid(),
        order: uniqid(),
        billing: {
            recipient: {
                category: RecipientCategory.PERSON,
                gender: Gender.MALE,
                firstName: 'John',
                lastName: 'Do',
                birthDate: '1990-01-01',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
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
                gender: Gender.MALE,
                firstName: 'John',
                lastName: 'Do',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
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
                quantity: 1,
                price: 50.5,
            },
            {
                identifier: 'Articlenumber2',
                description: 'Red Toy Car',
                vatPercentage: 21,
                quantity: 1,
                price: 50,
            },
        ],
        gender: Gender.MALE,
        operatingCountry: 'NL',
        pno: '01011990',
    })
    .request();

// Pay
klarna
    .pay({
        amountDebit: 100.5,
        invoice: uniqid(),
        order: uniqid(),
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
        shippingInfo: {
            company: 'Company Name',
            trackingNumber: '1234567890',
            shippingMethod: 'Standard',
        },
    })
    .request();

// Update Reservation (modify shipping or articles)
klarna
    .update({
        amountDebit: 100.5,
        invoice: uniqid(),
        order: uniqid(),
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
        shipping: {
            recipient: {
                category: RecipientCategory.PERSON,
                gender: Gender.MALE,
                firstName: 'John Updated',
                lastName: 'Do Updated',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '90',
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
                quantity: 1,
                price: 50.5,
            },
            {
                identifier: 'Articlenumber3',
                description: 'Green Toy Car',
                vatPercentage: 21,
                quantity: 1,
                price: 50,
            },
        ],
    })
    .request();

// Extend Reservation
klarna
    .extend({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
    })
    .request();

// Cancel Reservation
klarna
    .cancel({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
    })
    .request();

// Refund
klarna
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // transactionKey from pay transaction
        amountCredit: 10.1,
        invoice: uniqid(),
    })
    .request();
