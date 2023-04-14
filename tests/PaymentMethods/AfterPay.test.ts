import Afterpay from '../../src/PaymentMethods/Afterpay/index'
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay'
import { RefundPayload } from '../../src/Models/ITransaction'
import RecipientCategory from '../../src/Constants/RecipientCategory'
require('../BuckarooClient.test')

const method = new Afterpay()
describe('AfterPay methods', () => {

    test('Pay', async () => {
        await method.pay(payload).then((data) => {
            expect(data.isSuccess()).toBeTruthy()
        })
    })
    test('Refund', async () => {
        await method.refund({ ...refundPayload }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Authorize', async () => {
        await method.authorize(payload).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('CancelAuthorize', async () => {
        await method.cancelAuthorize(refundPayload).then((data) => {
            expect(data).toBeDefined()
        })
    })

    test('Capture', async () => {
        await method
            .capture({
                amountDebit: 4,
                invoice: '123456789',
                originalTransactionKey: '123456789'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('PayRemainder', async () => {
        await method.payRemainder(payload).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('AuthorizeRemainder', async () => {
        await method.authorizeRemainder(payload).then((data) => {
            expect(data).toBeDefined()
        })
    })
})

let refundPayload: RefundPayload = {
    amountCredit: 14,
    originalTransactionKey: '123456789'
}

let payload: IPay = {
    amountDebit: 14,
    clientIP: '127.0.0.1',

    shippingCustomer: {
        city: 'rew',
        country: 'NL',
        street: 'fsd',
        streetNumber: '423',
        streetNumberAdditional: 'ewr',
        postalCode: '1234AB',
        email: 'example@hotmail.com',
        phone: '+31201234567',
        mobilePhone: '+31612345678',
        birthDate: '1999-11-21',
        careOf: '',
        category: RecipientCategory.PERSON,
        conversationLanguage: 'NL',
        customerNumber: 'a',
        firstName: 'a',
        identificationNumber: '675',
        lastName: 'a',
        salutation: 'Mr'
    },
    billingCustomer: {
        city: 'rew',
        country: 'NL',
        street: 'fsd',
        streetNumber: '423',
        streetNumberAdditional: 'ewr',
        postalCode: '1234AB',
        email: 'example@hotmail.com',
        phone: '+31201234567',
        mobilePhone: '+31612345678',
        birthDate: '1999-11-21',
        careOf: '',
        category: RecipientCategory.PERSON,
        conversationLanguage: 'NL',
        customerNumber: 'a',
        firstName: 'a',
        identificationNumber: '675',
        lastName: 'a',
        salutation: 'Mr'
    },
    article: [
        {
            description: 'ter',
            identifier: '423f',
            imageUrl: '',
            quantity: 1,
            type: 'PhysicalArticle',
            unitCode: '',
            url: '',
            vatPercentage: 0,
            grossUnitPrice: 7

        },
        {
            description: 'ter',
            identifier: '423f',
            unitCode: '',
            type: 'PhysicalArticle',
            quantity: 1,
            vatPercentage: 0,
            grossUnitPrice: 7
        }
    ]
}
