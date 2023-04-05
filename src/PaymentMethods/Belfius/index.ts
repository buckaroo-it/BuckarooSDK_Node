import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

export default class Belfius extends PayablePaymentMethod {
    protected _paymentName = 'belfius'
    protected _serviceVersion = 1

    pay(payload: Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
