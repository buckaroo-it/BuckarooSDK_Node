import { pay } from '../PaymentMethods/Sofort/Sofort'
import { uniqid } from '../Utils/Functions'

pay({
    invoice: uniqid(),
    amountDebit: 10.1
})
