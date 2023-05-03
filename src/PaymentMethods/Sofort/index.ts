import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

export default class Sofort extends PayablePaymentMethod {
    protected _paymentName = 'sofortueberweisung'
    protected _serviceVersion = 1

    pay(payload: Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    instantRefund(payload: RefundPayload){
        this.action = 'InstantRefund'
        return super.refund(payload)
    }
}
