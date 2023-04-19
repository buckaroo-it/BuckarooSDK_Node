require('./BuckarooClient')
import CreditCard from '../src/PaymentMethods/CreditCard'

const paymentMethod = new CreditCard()

;(async () => {
    try {
        const info = await paymentMethod.pay({
            invoice: 'test1',
            amountDebit: 12,
            name: 'Visa'
        })
    } catch (error) {
        console.warn(error)
    }
})()
