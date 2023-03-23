require('../BuckarooClient.test')
import Tinka from '../../src/PaymentMethods/Tinka/index'

const method = Tinka()

describe('Tinka', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 3.5,
                description: 'This is a test order',
                paymentMethod: 'Credit',
                deliveryMethod: 'Locker',
                deliveryDate: '2030-01-01',
                articles: [
                    {
                        type: 1,
                        description: 'Blue Toy Car',
                        brand: 'Ford Focus',
                        manufacturer: 'Ford',
                        color: 'Red',
                        size: 'Small',
                        quantity: 1,
                        price: 3.5,
                        unitCode: 'test'
                    }
                ],
                customer: {
                    gender: '',
                    firstName: 'Buck',
                    lastName: 'Aroo',
                    initials: 'BA',
                    dateOfBirth: '1990-01-01'
                },
                billing: {
                    recipient: {
                        lastNamePrefix: 'the'
                    },
                    email: 'billingcustomer@buckaroo.nl',
                    phone: {
                        mobile: '0109876543'
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'A',
                        zipcode: '8441EE',
                        city: 'Heerenveen',
                        country: 'NL'
                    }
                },
                shipping: {
                    recipient: {
                        lastNamePrefix: 'the'
                    },
                    email: 'billingcustomer@buckaroo.nl',
                    phone: {
                        mobile: '0109876543'
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'A',
                        zipcode: '8441EE',
                        city: 'Heerenveen',
                        country: 'NL'
                    }
                }
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
                console.log(info.find('requestErrors'))
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 3.5,
                originalTransactionKey: '1234567890'
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
                console.log(info.find('requestErrors'))
            })
    })
})
