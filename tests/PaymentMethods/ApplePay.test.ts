require('../BuckarooClient.test')
import ApplePay from '../../src/PaymentMethods/ApplePay/index'

const method = ApplePay()

describe('Applepay methods', () => {
    // test('Pay Simple Payload', async () => {
    //     await method
    //         .pay({
    //             amountDebit: 10,
    //             paymentData: 'sad',
    //             customerCardName: '87y7y8'
    //         })
    //         .then((data) => {
    //             expect(data).toBeDefined()
    //             console.log(data.find('ParameterErrors') || data.find('Parameters'))
    //         })
    // })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 5,
                originalTransactionKey: 'F397DA6A251645F8BDD81547B5005B4B'
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
