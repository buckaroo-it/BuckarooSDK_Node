import Billink from '../../src/PaymentMethods/Billink/index'
import { IPay } from '../../src/PaymentMethods/Billink/Models/Pay'

require('../BuckarooClient.test')

const method = new Billink()

describe('Billink methods', () => {
    test('Specifications', async () => {
        await method.specification().then((data) => {
            data.getActionRequestParameters('Pay')
            expect(data).toBeDefined()
        })
    })
    test('Pay', async () => {
        await method.pay(payload).then((data) => {
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
    VATNumber: '',
    additionalParameters: undefined,
    amountDebit: 0,
    articles: [],
    billingCustomer: {
        chamberOfCommerce: '',
        city: '',
        firstName: '',
        initials: '',
        lastName: '',
        postalCode: '',
        street: '',
        streetNumber: 0
    },
    clientIP: undefined,
    continueOnIncomplete: '',
    culture: '',
    currency: '',
    customParameters: undefined,
    description: '',
    invoice: '',
    order: '',
    originalTransactionKey: '',
    originalTransactionReference: '',
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
    trackandtrace: ''
}
