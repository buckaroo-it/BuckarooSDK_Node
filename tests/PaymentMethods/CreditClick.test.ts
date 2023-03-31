require('../BuckarooClient.test')
import creditClick from '../../src/PaymentMethods/CreditClick/index'

const method = creditClick()

describe('Testing CreditClick methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 31
            })
            .then((response) => {
                expect(response).toBeDefined()
                console.log(response)
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 31,
                originalTransactionKey: 'C85BABFCCA2D4921B9CFBA0EBDF82C70',
                description: 'test',
                refundReason: 'Fraudulent'
            })
            .then((response) => {
                console.log(response)
            })
    })
})
