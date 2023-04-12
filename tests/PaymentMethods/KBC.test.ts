require('../BuckarooClient.test')
import KBC from '../../src/PaymentMethods/KBC'

const method = new KBC()

describe('Testing KBC methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .then((response) => {
                
                expect(response).not.toBeNull()
            })
    })
    test('Refund', async () => {
        method
            .refund({
                amountCredit: 0,
                originalTransactionKey: 'B5675356904444F3965C33D280591C74'
            })
            .then((response) => {
                
                expect(response).not.toBeNull()
            })
    })
})
