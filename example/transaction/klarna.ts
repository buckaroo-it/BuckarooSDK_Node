import buckarooClient from '../buckarooClient';
import { Gender, RecipientCategory, uniqid } from '../../src';

const klarna = buckarooClient.method('klarna');

// Reserve
klarna
    .reserve({
        amountDebit: 100,
        invoice: uniqid(),
        order: uniqid(),
        clientIP: '127.0.0.1',
        gender: Gender.MALE,
        operatingCountry: 'NL',
        pno: '01011990',
        billing: {
            recipient: {
                category: RecipientCategory.PERSON,
                firstName: 'Test',
                lastName: 'Acceptatie',
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
                firstName: 'Test',
                lastName: 'Acceptatie',
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
                price: 25.15,
            },
            {
                identifier: 'Articlenumber2',
                description: 'Red Toy Car',
                vatPercentage: 21,
                quantity: 1,
                price: 25.15,
            },
        ],
    })
    .request();

// Pay
klarna
    .pay({
        amountDebit: 100,
        invoice: uniqid(),
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From reserve response
        shippingInfo: {
            company: 'DHL Express',
            trackingNumber: 'TRACK1234567890',
            shippingMethod: 'Next Day Delivery',
        },
    })
    .request();

// Update Reservation
klarna
    .update({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From reserve response
        invoice: 'Updated-' + uniqid(),
        shipping: {
            recipient: {
                category: RecipientCategory.PERSON,
                firstName: 'Jane',
                lastName: 'Smith',
            },
            address: {
                street: 'Nieuwe Straat',
                houseNumber: '25',
                zipcode: '5678CD',
                city: 'Rotterdam',
                country: 'NL',
            },
            email: 'updated@buckaroo.nl',
        },
        articles: [
            {
                identifier: 'Articlenumber1',
                description: 'Updated Blue Toy Car',
                vatPercentage: 21,
                quantity: 3,
                price: 20.1,
            },
        ],
    })
    .request();

// Extend Reservation
klarna
    .extend({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From reserve response
    })
    .request();

// Cancel Reservation
klarna
    .cancel({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From reserve response
    })
    .request();

// Refund
klarna
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From pay response
        amountCredit: 10.1,
        invoice: 'Klarna Refund',
    })
    .request();
