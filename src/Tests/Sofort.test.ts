import { initializeBuckarooClient } from '../BuckarooClient'
import Sofort from '../PaymentMethods/Sofort'

initializeBuckarooClient()

const method = Sofort()

describe('Sofort', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 50.3,
                order: '123456'
            })
            .then((info) => {
                console.log(info)
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
                console.log(info)
                expect(info).toBeDefined()
            })
    })
})
