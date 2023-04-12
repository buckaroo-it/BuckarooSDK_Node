require('../BuckarooClient.test')
import AfterPayDigiAccept from '../../src/PaymentMethods/AfterpayDigiAccept'



const method = new AfterPayDigiAccept()

describe('AfterPayDigiAccept methods', () => {
    test('Authorize', async () => {
        await method.authorize({
            amountDebit: 14,
            clientIP: '127.0.0.1',
        }).then((data) => {
            expect(data).toBeDefined()
        })
    })
    test('Pay', async () => {
        await method.pay({
            amountDebit: 14,
            clientIP: '127.0.0.1',
        }).then((data) => {
            expect(data.isSuccess()).toBeTruthy()
        })
    })
})
