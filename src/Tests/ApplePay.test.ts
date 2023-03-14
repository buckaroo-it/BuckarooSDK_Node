import {initializeBuckarooClient} from '../BuckarooClient'
import ApplePay from "../PaymentMethods/ApplePay";

initializeBuckarooClient()

const method = ApplePay()

describe('testing methods', () => {

    test('Pay Simple Payload', async () => {
        await method.pay({
            amountDebit: 10,
            paymentData:'sad',
            customerCardName: ""
        }).then((data) => {
            expect(data).toBeDefined()
            console.log(data.find('ParameterErrors') || data.find('Parameters'))
        })
    })
    test('Refund', async () => {
        await method.refund({
            amountCredit: 5,
            originalTransactionKey:'F397DA6A251645F8BDD81547B5005B4B'
        }).then((data) => {
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
