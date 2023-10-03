import Gender from '../../src/Constants/Gender'
import PayPerEmail from '../../src/PaymentMethods/PayPerEmail'

require('../BuckarooClient.test')

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
                continueOnIncomplete: 1,
                culture: '',
                customParameters: undefined,
                customerEmail: '',
                customerFirstName: '',
                customerGender: Gender.NOT_APPLICABLE,
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
