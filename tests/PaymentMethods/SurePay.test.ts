require('../BuckarooClient.test')
import SurePay from '../../src/PaymentMethods/Surepay/index'

const method = new SurePay()

describe('Sofort', () => {
    test('Verify', async () => {
        await method
            .verify({
                additionalParameters: undefined,
                amountCredit: 0,
                amountDebit: 0,
                clientIP: undefined,
                continueOnIncomplete: '',
                culture: '',
                currency: '',
                customParameters: undefined,
                customeraccountname: 'string',
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
                startRecurrent: false
            })
            .then((info) => {
                
                expect(info).toBeDefined()
            })
    })
})
