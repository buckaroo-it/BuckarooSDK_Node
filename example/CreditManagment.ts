require('./BuckarooClient')
import CreditManagement from '../src/PaymentMethods/CreditManagement'

const creditManagement = new CreditManagement()

;(async () => {
    try {
        const info = await creditManagement.invoiceInfo({
            invoice: 'test1'
        })
        console.log(info)

        const infoMultiple = await creditManagement.invoiceInfo({
            invoice: 'invoice1',
            invoices: [
                {
                    invoiceNumber: 'invoice2'
                },
                {
                    invoiceNumber: 'invoice3'
                }
            ]
        })
        console.log(infoMultiple)
    } catch (error) {
        console.warn(error)
    }
})()
