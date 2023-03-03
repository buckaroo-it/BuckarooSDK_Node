import { initializeBuckarooClient } from '../src/BuckarooClient'

initializeBuckarooClient()

import { Klarna } from '../src/PaymentMethods/Klarna/Klarna'

const klarna = new Klarna()
klarna
    .pay({
        order: '123456',
        amountDebit: 50.3,
        invoice: '12345',
        billing: {
            recipient: {
                category: 'B2C',
                gender: 'female',
                firstName: 'John',
                lastName: 'Do',
                birthDate: '1990-01-01'
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '13',
                houseNumberAdditional: 'a',
                zipcode: '1234AB',
                city: 'Heerenveen',
                country: 'GB'
            },
            phone: {
                mobile: '0698765433'
            },
            email: 'test@buckaroo.nl'
        },
        shipping: {
            recipient: {
                category: 'B2C',
                gender: 'male',
                firstName: 'John',
                lastName: 'Do',
                birthDate: '1990-01-01'
            },
            address: {
                street: 'Kalverstraat',
                houseNumber: '13',
                houseNumberAdditional: 'b',
                zipcode: '4321EB',
                city: 'Amsterdam',
                country: 'GB'
            },
            email: 'test@buckaroo.nl'
        },
        articles: [
            {
                identifier: 'Articlenumber1',
                description: 'Blue Toy Car',
                vatPercentage: 21,
                quantity: 2,
                price: 32
            },
            {
                identifier: 'Articlenumber2',
                description: 'Red Toy Car',
                vatPercentage: 21,
                quantity: 1,
                price: 10.1
            }
        ]
    })
    .then((res) => {
        console.log(res)
    })
