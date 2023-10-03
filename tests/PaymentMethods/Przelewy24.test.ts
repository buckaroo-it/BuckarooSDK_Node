require('../BuckarooClient.test')
import Przelewy24 from '../../src/PaymentMethods/Przelewy24'

const method = new Przelewy24('Przelewy24')

describe('Przelewy24', () => {
    test('Pay', async () => {
        method
            .pay({
                amountDebit: 50.3,
                customer: {
                    firstName: 'test',
                    lastName: 'test'
                },
                email: 'test@hotmail.com'
            })
            .request()
            .then((res) => {
                expect(res.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .request()
            .then((info) => {
                expect(info.data).toBeDefined()
            })
    })
})
