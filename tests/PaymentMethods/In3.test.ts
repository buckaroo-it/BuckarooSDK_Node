require('../BuckarooClient.test')
import In3 from '../../src/PaymentMethods/In3'

const in3 = new In3()

describe('Testing In3 methods', () => {
    test('Pay', async () => {
        await in3
            .pay({
                additionalParameters: undefined,
                address: undefined,
                amountDebit: 0,
                clientIP: undefined,
                company: undefined,
                continueOnIncomplete: '',
                culture: '',
                currency: '',
                customParameters: undefined,
                customerType: '',
                description: '',
                email: { email: '' },
                invoice: '',
                invoiceDate: '',
                order: '',
                originalTransactionKey: '',
                originalTransactionReference: '',
                person: undefined,
                phone: {},
                productLine: [],
                pushURL: '',
                pushURLFailure: '',
                returnURL: '',
                returnURLCancel: '',
                returnURLError: '',
                returnURLReject: '',
                servicesExcludedForClient: '',
                servicesSelectableByClient: '',
                startRecurrent: false,
                subtotalLine: []
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
})
