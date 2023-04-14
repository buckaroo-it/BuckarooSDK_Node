require('../BuckarooClient.test')
import WechatPay from '../../src/PaymentMethods/WeChatPay/index'

const method = new WechatPay()

describe('WechatPay', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 3.5,
                locale: 'en-US'
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
    test('Refund', async () => {
        await method
            .refund({
                amountCredit: 3.5,
                originalTransactionKey: '1234567890'
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
})
