require('../BuckarooClient.test')
import Tinka from '../../src/PaymentMethods/Tinka/index'

const method = new Tinka()

describe('Tinka', () => {
    test('Pay', async () => {
        await method
            .pay({
                additionalParameters: undefined,
                amountDebit: 0,
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
                serviceParameters: undefined,
                servicesExcludedForClient: '',
                servicesSelectableByClient: '',
                startRecurrent: false
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
