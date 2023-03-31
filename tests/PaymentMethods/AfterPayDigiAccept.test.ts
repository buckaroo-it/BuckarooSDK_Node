import { country } from '../../src/PaymentMethods/Afterpay/Model/Recipient'
import AfterPayDigiAccept from '../../src/PaymentMethods/AfterpayDigiAccept'
import RecipientCategory from '../../src/Constants/RecipientCategory'
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Services'
import { RefundPayload } from '../../src/Models/ITransaction'
import { IAfterPayArticle } from '../../src/PaymentMethods/Afterpay/Model/Article'

require('../BuckarooClient.test')

const method = AfterPayDigiAccept()

describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        await method.authorize(payload).then((data) => {
            console.log(data)
            expect(data).toBeDefined()
            // expect(data.isSuccess()).toBeTruthy()
        })
    })
    test('Pay', async () => {
        await method.pay(payload).then((data) => {
            expect(data.isSuccess()).toBeTruthy()
        })
    })
})

let articles: IAfterPayArticle[] = [
    {
        description: 'ter',
        price: 7,
        identifier: '423f',
        imageUrl: '',
        quantity: 1,
        type: 'Giftcard',
        unitCode: '',
        url: '',
        vatPercentage: 0
    },
    {
        description: 'ter',
        price: 7,
        identifier: '423f',
        unitCode: '',
        type: 'Giftcard',
        quantity: 1,
        vatPercentage: 0
    }
]
let payload: IPay = {
    amountDebit: 14,
    clientIP: '127.0.0.1',
    shipping: {
        address: {
            city: 'rew',
            country: country.DE,
            houseNumber: '423',
            houseNumberAdditional: 'ewr',
            street: 'fsd',
            zipcode: '1234AB'
        },
        email: 'example@hotmail.com',
        phone: {
            mobile: '+31612345678',
            landline: '+31201234567'
        },
        recipient: {
            birthDate: '1999-11-21',
            careOf: '',
            category: RecipientCategory.PERSON,
            conversationLanguage: 'NL',
            customerNumber: 'a',
            firstName: 'a',
            identificationNumber: '675',
            lastName: 'a',
            title: '',
            gender: 'Mr'
        }
    },
    billing: {
        address: {
            city: 'rew',
            country: country.NL,
            houseNumber: '423',
            houseNumberAdditional: 'ewr',
            street: 'fsd',
            zipcode: '1234AB'
        },
        email: 'example@hotmail.com',
        phone: {
            mobile: '+31612345678',
            landline: '+31201234567'
        },
        recipient: {
            birthDate: '1999-11-21',
            careOf: '',
            category: RecipientCategory.PERSON,
            conversationLanguage: 'NL',
            customerNumber: 'a',
            firstName: 'a',
            identificationNumber: '675',
            lastName: 'a',
            title: '',
            gender: 'Mr'
        }
    },
    articles: articles
}
let refundPayload: RefundPayload = {
    amountCredit: 14,
    originalTransactionKey: '123456789'
}
