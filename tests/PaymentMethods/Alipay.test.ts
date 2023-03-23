require('../BuckarooClient.test')
import Alipay from '../../src/PaymentMethods/Alipay'

const method = Alipay()

describe('testing methods', () => {
    test('Pay Simple Payload', async () => {
        await method
            .pay({
                amountDebit: 10,
                useMobileView: false
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(data.find('ParameterErrors') || data.find('Parameters'))
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397777A251645F8BDD81547B5005B4B'
            })
            .then((data) => {
                expect(data).toBeDefined()
                console.log(data.find('ParameterErrors') || data.find('Parameters'))
            })
    })
    test('Specifications', async () => {
        await method.specification().then((data) => {
            expect(data).toBeDefined()
        })
    })
})
