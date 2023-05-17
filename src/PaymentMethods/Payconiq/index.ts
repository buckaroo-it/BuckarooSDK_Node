import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

export default class Payconiq extends PayablePaymentMethod {
    protected _paymentName = 'payconiq'

    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    instantRefund(payload: RefundPayload){
        this.action = 'InstantRefund'
        return super.refund(payload)
    }
}
