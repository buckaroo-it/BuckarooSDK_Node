require('../BuckarooClient.test')
import PayPerEmail from '../../src/PaymentMethods/PayPerEmail/index'

const method = new PayPerEmail()

describe('PayPerEmail methods', () => {
    test('paymentInvitation', async () => {
        await method
            .paymentInvitation({
                invoice: '123456',
                amountDebit: 10,
                currency: 'EUR',
                attachment: '',
                additionalParameters: undefined,
                clientIP: undefined,
                continueOnIncomplete: '',
                culture: '',
                customParameters: undefined,
                customerEmail: '',
                customerFirstName: '',
                customerGender: undefined,
                customerLastName: '',
                description: '',
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
                startRecurrent: false,
                email: 's',
                expirationDate: '',
                merchantSendsEmail: false,
                paymentMethodsAllowed: 'ideal'
            })
            .then((response) => {
                expect(response).toBeDefined()
            })
    })
})
