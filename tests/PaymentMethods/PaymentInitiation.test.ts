require('../BuckarooClient.test')
import PaymentInitiation from '../../src/PaymentMethods/PaymentInitiation'

const paymentInitiation = new PaymentInitiation()

describe('PaymentInitiation methods', () => {
    test('Pay', async () => {
        await paymentInitiation
            .pay({
                amountDebit: 50.3,
                order: '123456',
                issuer: 'INGBNL2A',
                countryCode: 'NL'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await paymentInitiation
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
