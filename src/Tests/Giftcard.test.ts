import { initializeBuckarooClient } from '../BuckarooClient'
import GiftCard from '../PaymentMethods/GiftCard'

initializeBuckarooClient()
const method = GiftCard()

describe('GiftCard methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 10,
                name: 'GiftCard',
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(
                    data.hasError()
                        ? data.find('ParameterErrors') || data.find('Parameters')
                        : data.getStatusCode()
                )
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                name: 'GiftCard',
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B'
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(
                    data.hasError()
                        ? data.find('ParameterErrors') || data.find('Parameters')
                        : data.getStatusCode()
                )
            })
    })
})
