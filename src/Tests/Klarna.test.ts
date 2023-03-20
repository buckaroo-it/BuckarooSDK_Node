import Klarna from '../PaymentMethods/Klarna'
import { uniqid } from '../Utils/Functions'
import { initializeBuckarooClient } from '../BuckarooClient'
initializeBuckarooClient()

const klarna = Klarna()

describe('Testing Klarna methods', () => {
    test('Pay', async () => {
        await klarna
            .pay({
                order: uniqid(),
                amountDebit: 50.3,
                invoice: uniqid(),
                billing: {
                    recipient: {
                        category: 'B2C',
                        gender: 'female',
                        firstName: 'John',
                        lastName: 'Do',
                        birthDate: '1990-01-01'
                    },
                    address: {
                        street: 'Kalverstraat',
                        houseNumber: 13,
                        houseNumberAdditional: 'b',
                        zipcode: '4321EB',
                        city: 'Heerenveen',
                        country: 'GB'
                    },
                    phone: {
                        phone: '0698765433'
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
                        houseNumber: 13,
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
                expect(res).toBeDefined()
                console.log(res.find('parameterErrors'))
            })
    })
    test('Refund', async () => {
        await klarna.refund({
            amountCredit:21,
            originalTransactionKey:''
        }).then((res) => {
            expect(res).toBeDefined()
            console.log(res.find('parameterErrors'))
        })
    })
    test('payInInstallments', async () => {
        await klarna.payInInstallments({
            order: uniqid(),
        }).then((res) => {
            expect(res).toBeDefined()
            console.log(res.find('parameterErrors'))
        })
    })
})
