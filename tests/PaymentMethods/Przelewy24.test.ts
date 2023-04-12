require('../BuckarooClient.test')
import Przelewy24 from '../../src/PaymentMethods/Przelewy24/index'

const method = new Przelewy24()

describe('Przelewy24', () => {
    test('Pay', async () => {
        await method
            .pay({
                additionalParameters: undefined,
                amountDebit: 0,
                clientIP: undefined,
                continueOnIncomplete: '',
                costumer: undefined,
                culture: '',
                currency: '',
                customParameters: undefined,
                customerEmail: '',
                customerFirstName: '',
                description: '',
                email: '',
                invoice: '',
                lastName: '',
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
                startRecurrent: false
            })
            .then((info) => {
                expect(info).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
