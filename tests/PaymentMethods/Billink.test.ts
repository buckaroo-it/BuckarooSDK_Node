require('../BuckarooClient.test')
import Billink from '../../src/PaymentMethods/Billink/index'
import Gender from '../../src/Constants/Gender'

const method = Billink()

describe('testing methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 12,
                yourReference: '',
                articles: [],
                billing: {
                    address: {
                        city: '',
                        country: '',
                        houseNumber: '',
                        houseNumberAdditional: '',
                        street: '',
                        zipcode: ''
                    },
                    email: 'em',
                    phone: {
                        mobile: 'das'
                    },
                    recipient: {
                        birthDate: '',
                        careOf: '',
                        category: '',
                        chamberOfCommerce: '',
                        companyName: '',
                        culture: '',
                        firstName: '',
                        gender: Gender.MALE,
                        initials: '',
                        lastName: '',
                        lastNamePrefix: '',
                        name: '',
                        placeOfBirth: '',
                        title: '',
                        vatApplicable: false,
                        vatNumber: ''
                    }
                }
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 12,
                originalTransactionKey: 'ytgty'
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Authorize', async () => {
        await method.authorize().then((data) => {
            expect(data).toBeDefined()
            
        })
    })
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'ytgty',
                amountCredit: 10,
                invoice: 'sdsa'
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'ytgty',
                invoice: "'dsa",
                amountDebit: 123
            })
            .then((data) => {
                expect(data).toBeDefined()
                
            })
    })
})