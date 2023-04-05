import Afterpay from '../../src/PaymentMethods/Afterpay/index'
import RecipientCategory from '../../src/Constants/RecipientCategory'
import {IPay, ServiceParameters} from '../../src/PaymentMethods/Afterpay/Model/Services'
import { RefundPayload } from '../../src/Models/ITransaction'
import { IAfterPayArticle } from '../../src/PaymentMethods/Afterpay/Model/Article'
import { country } from '../../src/PaymentMethods/Afterpay/Model/Recipient'

require('../BuckarooClient.test')

const method = Afterpay()

describe('AfterPay methods', () => {
    test('Pay', async () => {
        try {
            await method.pay(payload).then((data) => {
                expect(data.isSuccess()).toBeTruthy()
            })
        }catch (e) {
            console.log(e)
        }
    })
    test('Refund', async () => {
        await method.refund({ ...refundPayload, articles: articles }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Authorize', async () => {
        await method.authorize(payload).then((data) => {
            expect(data.isSuccess()).toBeTruthy()
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
                originalTransactionKey: '123456789',
                articles: articles
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

let articles: IAfterPayArticle[] = [
    {
        description: 'T',
        identifier: 'FSD',
        imageUrl: '',
        // marketPlaceSellerId: '',
        price: 0,
        quantity: 0,
        refundType: undefined,
        type: 'PhysicalArticle',
        unitCode: '',
        url: '',
        vatPercentage: 0
    }
]
let serviceParameters: ServiceParameters = {
    shipping: {
        address: {
            city: 'rew',
            country: country.NL,
            houseNumber: '423',
            houseNumberAdditional: 'ewr',
            street: 'fsd',
            zipcode: '1234AB',
        },
        email: 'example@hotmail.com',
        phone: {
            mobile: '+31612345678',
            landline: '+31201234567'
        },
        recipient: {
            birthDate: '1999-11-21',
            category: RecipientCategory.PERSON,
            conversationLanguage: 'NL',
            customerNumber: 'a',
            firstName: 'a',
            identificationNumber: '675',
            lastName: 'a',
            title: '',
            gender: 'Mr',
        }
    },
    billing: {
        address: {
            city: 'rew',
            country: country.NL,
            houseNumber: '423',
            houseNumberAdditional: 'ewr',
            street: 'fsd',
            zipcode: '1234AB',
        },
        email: 'example@hotmail.com',
        phone: {
            mobile: '+31612345678',
            landline: '+31201234567'
        },
        recipient: {
            category: RecipientCategory.COMPANY,
            conversationLanguage: 'NL',
            customerNumber: 'a',
            firstName: 'a',
            identificationNumber: '675',
            lastName: 'a',
            title: '',
            gender: 'Mr',
            chamberOfCommerce: '',
            companyName: '',
        }
    },

    articles: articles
}
let refundPayload: RefundPayload = {
    amountCredit: 14,
    originalTransactionKey: '123456789'
}

let payload: IPay = {
    amountDebit: 14,
    clientIP: '127.0.0.1',
    ...serviceParameters
}