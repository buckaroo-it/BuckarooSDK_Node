require('../BuckarooClient.test')
import payPerEmail from '../../src/PaymentMethods/PayPerEmail/index'
import Gender from '../../src/Constants/Gender'

const method = payPerEmail()

describe('PayPerEmail methods', () => {
    test('paymentInvitation', async () => {
        await method
            .paymentInvitation({
                invoice: '123456',
                amountDebit: 10,
                currency: 'EUR',
                attachment: '',
                costumer: { firstName: 'test', gender: Gender.FEMALE, lastName: 'te' },
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
