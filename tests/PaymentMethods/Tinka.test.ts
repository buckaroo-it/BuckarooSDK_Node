require('../BuckarooClient.test')
import RecipientCategory from '../../src/Constants/RecipientCategory'
import Tinka from '../../src/PaymentMethods/Tinka/index'
import { country } from '../../src/PaymentMethods/Afterpay/Model/Recipient'

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
                        type: '1',
                        vatPercentage: 23,
                        description: 'Blue Toy Car',
                        brand: 'Ford Focus',
                        manufacturer: 'Ford',
                        color: 'Red',
                        size: 'Small',
                        quantity: 1,
                        price: 3.5,
                        vatCategory: 234,
                        unitCode: 'test'
                    }
                ],
                customer: {
                    gender: '',
                    firstName: 'Buck',
                    lastName: 'Aroo',
                    initials: 'BA',
                    birthDate: '1990-01-01'
                },
                billing: {
                    recipient: {
                        category: RecipientCategory.PERSON,
                        careOf: 'd',
                        title: 'sa',
                        lastNamePrefix: 'the',
                        firstName: '',
                        lastName: '',
                        birthDate: '',
                        placeOfBirth: '',
                        gender: 'Mr',
                        culture: 'das'
                    },
                    email: 'billingcustomer@buckaroo.nl',
                    phone: {
                        mobile: '0109876543',
                        landline: '1232321312'
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'A',
                        zipcode: '8441EE',
                        city: 'Heerenveen',
                        country: country.DE,
                        state: 'ds'
                    }
                },
                shipping: {
                    recipient: {
                        category: RecipientCategory.COMPANY,
                        careOf: 'd',
                        title: 'sa',
                        companyName: 'das',
                        vatApplicable: true,
                        vatNumber: '23',
                        firstName: 'asd',
                        lastName: 'as',
                        gender: 'Mr',
                        culture: 'asd',
                        chamberOfCommerce: 'dsa'
                    },
                    email: 'billingcustomer@buckaroo.nl',
                    phone: {
                        mobile: '0109876543',
                        landline: 'dsa'
                    },
                    address: {
                        street: 'Hoofdstraat',
                        houseNumber: '80',
                        houseNumberAdditional: 'A',
                        zipcode: '8441EE',
                        city: 'Heerenveen',
                        country: country.DE,
                        state: 'dsa'
                    }
                }
            })
            .then((info) => {
                expect(info.isPendingProcessing()).toBeTruthy()
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
            })
    })
})
