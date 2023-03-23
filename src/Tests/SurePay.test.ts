import { initializeBuckarooClient } from '../BuckarooClient'
import SurePay from '../PaymentMethods/Surepay'

initializeBuckarooClient()

const method = SurePay()

describe('Sofort', () => {
    test('Verify', async () => {
        await method
            .verify({
                bankAccount:{
                    accountName: 'John Doe',
                    iban: 'NL91ABNA0417164300',
                }
            })
            .then((info) => {
                console.log(info)
                expect(info).toBeDefined()
            })
    })
})
