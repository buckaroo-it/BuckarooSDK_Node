import { initializeBuckarooClient } from '../src/BuckarooClient'
import { creditManagement } from '../src/PaymentMethods/CreditManagement/CreditManagement'

initializeBuckarooClient()

;(async () => {
    try {
        const info = await creditManagement().invoiceInfo({
            invoice: 'test1'
        })
        console.log(info)

        const infoMultiple = await creditManagement().invoiceInfo({
            invoice: ['test1', 'test2']
        })
        console.log(infoMultiple)
    } catch (error) {
        console.warn(error)
    }
})()
