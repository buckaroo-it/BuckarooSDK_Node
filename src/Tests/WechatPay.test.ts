import { initializeBuckarooClient } from '../BuckarooClient'
import WechatPay from '../PaymentMethods/WeChatPay'

initializeBuckarooClient()
const method = WechatPay()

describe('WechatPay', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 3.5,
                locale: 'en-US'
            })
            .then((response) => {
                console.log(response)
                console.log(response.find('parameterErrors'))
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 3.5,
                originalTransactionKey: '1234567890'
            })
            .then((response) => {
                console.log(response)
                console.log(response.find('parameterErrors'))
            })
    })
})
