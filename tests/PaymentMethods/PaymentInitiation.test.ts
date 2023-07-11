require('../BuckarooClient.test')
import PaymentInitiation from '../../src/PaymentMethods/PaymentInitiation'

const payByBank = new PaymentInitiation()

describe('PaymentInitiation methods', () => {
    test('Pay', async () => {
        await payByBank
            .pay({
                amountDebit: 50.3,
                order: '123456',
                issuer: 'INGBNL2A',
                countryCode: 'NL'
            })
            .then((response) => {
                expect(response).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await payByBank
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
