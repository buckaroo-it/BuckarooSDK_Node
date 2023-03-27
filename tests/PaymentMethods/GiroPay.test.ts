require('../BuckarooClient.test')
import GiroPay from '../../src/PaymentMethods/Giropay/index'

const method = GiroPay()

describe('Testing Giropay methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                bic: '',
                costumerIBAN: '',
                amountDebit: 0
            })
            .then((response) => {
                expect(response).toBeDefined()
                console.log(response)
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 0,
                originalTransactionKey: ''
            })
            .then((response) => {
                expect(response).toBeDefined()
                console.log(response)
            })
    })
})