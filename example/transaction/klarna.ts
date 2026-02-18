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
            phone: {
                mobile: '0698765432',
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
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
        shippingInfo: {
            company: 'DHL Express',
            trackingNumber: 'TRACK1234567890',
            shippingMethod: 'Standard',
        },
    })
    .request();

// Update Reservation
klarna
    .update({
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
        invoice: uniqid(),
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
            phone: {
                mobile: '0698765432',
            },
            email: 'updated@buckaroo.nl',
        },
    })
    .request();

// Update Reservation - Update order lines
klarna
    .update({
        invoice: uniqid(),
        dataRequestKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // dataRequestKey from reserve transaction
        articles: [
            {
                identifier: 'Articlenumber1',
                description: 'Updated Blue Toy Car',
                vatPercentage: 21,
                quantity: 3,
                price: 20.1,
                imageUrl: 'https://apod.nasa.gov/apod/image/2210/ngc4631_sherick.jpg',
                url: 'https://apod.nasa.gov/apod/astropix.html',
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
        amountCredit: 10.1,
        invoice: uniqid(),
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // From pay transaction
    })
    .request();
