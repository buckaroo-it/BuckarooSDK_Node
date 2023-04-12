require('../BuckarooClient.test')
import Payconiq from '../../src/PaymentMethods/Payconiq/index'

const payconiq = new Payconiq()

describe('Payconiq', () => {
    test('Pay', async () => {
        await payconiq
            .pay({
                amountDebit: 50.3,
                order: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await payconiq
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
