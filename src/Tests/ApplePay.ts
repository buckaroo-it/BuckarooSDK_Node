import { pay } from '../PaymentMethods/ApplePay/ApplePay'
import { uniqid } from '../Utils/Functions'

pay({
    amountDebit: 10,
    invoice: uniqid(),
    paymentData: 'XXXXXXXXXXXXX',
    customerCardName: 'Buck Aroo'
})
