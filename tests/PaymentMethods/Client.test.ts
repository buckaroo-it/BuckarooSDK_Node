require('../BuckarooClient.test')
import { buckarooClient } from '../../src/BuckarooClient'
import { TransactionRequest } from '../../src/Models/Request'

const client = buckarooClient()
test('PaymentStatus', async () => {
    await client.status('0AA966B997CB4676B55A07E9C3BA4DB4').then((data) => {
        expect(data).toBeDefined()
        console.log(data)
    })
})
test('paymentCancelStatus', async () => {
    await client.cancelInfo('73902D944DC848CBADC49D9B8A8C2F16').then((data) => {
        expect(data).toBeDefined()
    })
})

test('paymentCancelInfo', async () => {
    await client.transactionRequest(new TransactionRequest().getData()).then((data) => {
        expect(data).toBeDefined()
    })
})
test('paymentRefundInfo', async () => {
    await client.refundInfo('73902D944DC848CBADC49D9B8A8C2F16').then((data) => {
        expect(data).toBeDefined()
    })
})

test('paymentInvoiceInfo', async () => {
    await client.invoiceInfo('5f5701d44aac88').then((data) => {
        expect(data).toBeDefined()
    })
})

test('Service specifications', async () => {
    let specifications = await client.specifications([
        {
            name: 'ideal',
            version: 1
        }
    ])
    expect(specifications).toBeDefined()
})
