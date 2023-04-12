require('../BuckarooClient.test')
import CreditClick from '../../src/PaymentMethods/CreditClick/index'

const method = new CreditClick()

describe('Testing CreditClick methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 31
            })
            .then((response) => {
                expect(response).toBeDefined()
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
                expect(response).toBeDefined()
            })
    })
})
