require('../BuckarooClient.test')
import Belfius from '../../src/PaymentMethods/Belfius/index'

const method = new Belfius()

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: '86CFE2CB5901463EADE061633BDB9EC8'
            })
            .then((data) => {
                expect(data).toBeDefined()
            })
    })
    test('Specifications', async () => {
        await method.specification().then((data) => {
            expect(data).toBeDefined()
        })
    })
})
