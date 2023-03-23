require('../BuckarooClient.test')
import Przelewy24 from '../../src/PaymentMethods/Przelewy24/index'

const method = Przelewy24()

describe('Przelewy24', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 50.3,
                order: '123456',
                costumer: { firstName: '213', lastName: '23' },
                email: 'sad'
            })
            .then((info) => {
                console.log(info)
                console.log(info.find('parameterErrors'))
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 50.3,
                originalTransactionKey: '123456'
            })
            .then((info) => {
                console.log(info)
            })
    })
})
