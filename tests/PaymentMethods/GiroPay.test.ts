import buckarooClientTest from '../BuckarooClient.test'
import { uniqid } from '../../src/Utils/Functions'
const method = buckarooClientTest.method('giropay')
describe('Testing Giropay methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                bic: 'GENODETT488',
                amountDebit: 10.1
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 10,
                invoice: uniqid(),
                originalTransactionKey: '2D04704995B74D679AACC59F87XXXXXX'
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy()
            })
    })
})
