import AfterPayDigiAccept from '../../src/PaymentMethods/AfterpayDigiAccept'
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay'

require('../BuckarooClient.test')

const method = new AfterPayDigiAccept()

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
let payload: IPay = {
    additionalParameters: undefined,
    amountDebit: 0,
    articles: [],
    bankAccount: '',
    bankCode: '',
    billingCustomer: undefined,
    clientIP: undefined,
    continueOnIncomplete: '',
    culture: '',
    currency: '',
    customParameters: undefined,
    description: '',
    invoice: '',
    merchantImageUrl: '',
    order: '',
    originalTransactionKey: '',
    originalTransactionReference: '',
    ourReference: '',
    pushURL: '',
    pushURLFailure: '',
    returnURL: '',
    returnURLCancel: '',
    returnURLError: '',
    returnURLReject: '',
    servicesExcludedForClient: '',
    servicesSelectableByClient: '',
    shippingCustomer: undefined,
    startRecurrent: false,
    summaryImageUrl: '',
    yourReference: ''
}
