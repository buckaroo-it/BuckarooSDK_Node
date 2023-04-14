require('../BuckarooClient.test')
import Przelewy24 from '../../src/PaymentMethods/Przelewy24/index'

const method = new Przelewy24()

describe('Przelewy24', () => {
    test('Pay', async () => {
        await method
            .pay({
                customerLastName: "",
                additionalParameters: undefined,
                amountDebit: 0,
                customerEmail: "",
                customerFirstName: "",
                email: "",
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
