import RecipientCategory from '../../src/Constants/RecipientCategory'
import Billink from '../../src/PaymentMethods/Billink/index'
import Gender from '../../src/Constants/Gender'
import { BuckarooError } from '../../src/Utils/BuckarooError'
import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay'
import { country } from '../../src/PaymentMethods/Afterpay/Model/Customer'

require('../BuckarooClient.test')

const method = Billink()

describe('Billink methods', () => {
    test('Specifications', async () => {
        await method.specification().then((data) => {
            data.getActionRequestParameters('Pay')
            expect(data).toBeDefined()
        })
    })
    test('Pay', async () => {
        await method
            .pay(payload)
            .then((data) => {
                expect(data).toBeDefined()
            })
            .catch((err) => {
                expect(err instanceof BuckarooError).toBeTruthy()
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
        await method.authorize(payload).then((data) => {
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

let payload: IPay = {
    amountDebit: 12,
    articles: [
        {
            price: 23,
            priceExcl: 232,
            description: '',
            identifier: '',
            vatPercentage: 0,
            quantity: 23,
        }
    ],
    billing: {
        address: {
            city: '',
            country: country.NL,
            houseNumber: '',
            houseNumberAdditional: '',
            street: '',
            zipcode: ''
        },
        email: 'em',
        phone: {
            mobile: '043424243234'
        },
        recipient: {
            // birthDate: '',
            careOf: '',
            category: RecipientCategory.B2B,
            chamberOfCommerce: '54t',
            companyName: 'rwewr',
            firstName: 't54',
            gender: Gender.MALE,
            lastName: '5t4',
            title: '',
            vatNumber: ''
        }
    }
}
