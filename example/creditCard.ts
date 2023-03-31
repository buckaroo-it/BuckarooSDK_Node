require('./BuckarooClient')
import creditCard from '../src/PaymentMethods/CreditCard'

const paymentMethod = creditCard()

;(async () => {
    try {
        const info = await paymentMethod.pay({
            invoice: 'test1',
            amountDebit: 12,
            name: 'Visa'
        })
        console.log(info)
    } catch (error) {
        console.warn(error)
    }
})()
