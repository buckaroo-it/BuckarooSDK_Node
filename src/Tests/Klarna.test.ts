import { Klarna } from '../PaymentMethods/Klarna/Klarna'
import { uniqid } from '../Utils/Functions'
import { buckarooClient, initializeBuckarooClient } from '../BuckarooClient'
initializeBuckarooClient()

const klarnaTest = new Klarna()

describe('Testing Klarna methods', () => {
    test('Pay', async () => {
        await klarnaTest
            .pay({
                currency: buckarooClient().getConfig().currency || '',
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
                        street: 'Hoofdstraat',
                        streetNumber: '13',
                        streetNumberAdditional: 'a',
                        postalCode: '1234AB',
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
                        streetNumber: '13',
                        streetNumberAdditional: 'b',
                        postalCode: '4321EB',
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
                        grossUnitPrice: 32
                    },
                    {
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        quantity: 1,
                        grossUnitPrice: 10.1
                    }
                ]
            })
            .then((res) => {
                console.log(res)
                expect(res).toBeDefined()
            })
    })
})
