import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Pay } from './Models/Pay'
import { Refund } from './Models/Refund'

export default class CreditClick extends PayablePaymentMethod {
    protected _paymentName = 'creditclick'

    pay(payload: Pay) {
        return super.pay(payload)
    }
    refund(payload: Refund) {
        return super.refund(payload)
    }
}
