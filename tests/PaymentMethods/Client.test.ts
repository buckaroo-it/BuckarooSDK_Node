import {uniqid} from "../../src/Utils/Functions";

require('../BuckarooClient.test')
import buckarooClient from '../../src/BuckarooClient'

const client = buckarooClient()
test('PaymentStatus', async () => {
    await client.status('0AA966B997CB4676B55A07E9C3BA4DB4').then((data) => {
        expect(data).toBeDefined()
        
    })
})
test('paymentCancelInfo', async () => {
    await client.cancelInfo('73902D944DC848CBADC49D9B8A8C2F16').then((data) => {
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
            paymentName: 'ideal',
            serviceVersion: 1
        }
    ])
    expect(specifications).toBeDefined()
})
test('Client Transaction Request', async () => {
    let specifications = await client.transactionRequest({
        invoice: uniqid(''),
        order: uniqid(''),
        currency: "EUR",
        amountDebit: 0.01,
        pushURL: "http://testcheckout.buckaroo.nl/push",
        description: "Test without payment method with ServicesSelectableByClient",
        continueOnIncomplete: 1,
        servicesSelectableByClient: 'ideal,paypal,bancontactmrcash',
        servicesExcludedForClient: 'ideal',

    })
    
    expect(specifications).toBeDefined()
})
