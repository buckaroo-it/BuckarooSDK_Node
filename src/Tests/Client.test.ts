import { initializeBuckarooClient } from '../BuckarooClient'
import client from '../Request/Client'
import { ideal } from '../PaymentMethods/Ideal/Ideal'
import { klarna } from '../PaymentMethods/Klarna/Klarna'
initializeBuckarooClient()
test('PaymentStatus', async () => {
    await client.getPaymentStatus('0AA966B997CB4676B55A07E9C3BA4DB4').then((data) => {
        expect(data).toBeDefined()
        console.log(data)
    })
})
test('paymentCancelStatus', async () => {
    await client.getPaymentCancelStatus('73902D944DC848CBADC49D9B8A8C2F16').then((data) => {
        expect(data).toBeDefined()
    })
})

test('paymentRefundInfo', async () => {
    await client.getPaymentRefundInfo('73902D944DC848CBADC49D9B8A8C2F16').then((data) => {
        expect(data).toBeDefined()
    })
})

test('paymentInvoiceInfo', async () => {
    await client.getPaymentInvoiceInfo('5f5701d44aac88').then((data) => {
        expect(data).toBeDefined()
    })
})

test('specifications', async () => {
    let specifications = await client.specifications([ideal, klarna])

    let specifications2 = await client.specifications([
        {
            Name: 'ideal',
            Version: 1
        }
    ])
})