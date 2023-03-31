require('../BuckarooClient.test')
import WechatPay from '../../src/PaymentMethods/WeChatPay/index'

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
            })
    })
})
