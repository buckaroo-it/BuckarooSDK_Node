import { initializeBuckarooClient } from '../src/BuckarooClient'
import creditCard from '../src/PaymentMethods/CreditCard'
initializeBuckarooClient()

const paymentMethod = creditCard('Visa')

;(async () => {
    try {
        const info = await paymentMethod.pay({
            invoice: 'test1',
            amountDebit: 12
        })
        console.log(info)
    } catch (error) {
        console.warn(error)
    }
})()
