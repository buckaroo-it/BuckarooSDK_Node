require('../buckarooClient')
import CreditCard from '../../src/PaymentMethods/CreditCard'

const paymentMethod = new CreditCard('nexi')

;(async () => {
    try {
        const info = await paymentMethod.pay({
            invoice: 'test1',
            amountDebit: 12
        })
    } catch (error) {
        console.warn(error)
    }
})()
