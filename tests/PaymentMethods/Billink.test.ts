import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay'
import buckarooClientTest from '../BuckarooClient.test'
import RecipientCategory from '../../src/Constants/RecipientCategory'

require('../BuckarooClient.test')

const method = buckarooClientTest.method('billink')

describe('Billink methods', () => {
    test('Pay', async () => {
        await method
            .pay(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 12,
                originalTransactionKey: 'ytgty'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Authorize', async () => {
        await method
            .authorize(payload)
            .request()
            .then((data) => {
                expect(data.isSuccess()).toBeTruthy()
            })
    })
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                originalTransactionKey: 'ytgty',
                amountCredit: 10,
                invoice: 'sdsa'
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Capture', async () => {
        await method
            .capture({
                originalTransactionKey: 'ytgty',
                invoice: "'dsa",
                amountDebit: 123,
                articles: payload.articles
            })
            .request()
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
})

const payload: IPay = {
    amountDebit: 50.3,
    order: '',
    invoice: '',
    trackAndTrace: 'TR0F123456789',
    vATNumber: '2',
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'John Smith',
            title: 'Female',
            initials: 'JD',
            firstName: 'John',
            lastName: 'Do',
            birthDate: '01-01-1990',
            chamberOfCommerce: 'TEST'
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '13',
            houseNumberAdditional: 'a',
            zipcode: '1234AB',
            city: 'Heerenveen',
            country: 'NL'
        },
        phone: {
            mobile: '0698765433',
            landline: '0109876543'
        },
        email: 'test@buckaroo.nl'
    },
    shipping: {
        recipient: {
            category: RecipientCategory.PERSON,
            careOf: 'John Smith',
            title: 'Male',
            initials: 'JD',
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
            country: 'NL'
        }
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            description: 'Blue Toy Car',
            vatPercentage: 21,
            quantity: 2,
            price: 20.1,
            priceExcl: 5
        },
        {
            identifier: 'Articlenumber2',
            description: 'Red Toy Car',
            vatPercentage: 21,
            quantity: 1,
            price: 10.1,
            priceExcl: 5
        }
    ]
}
