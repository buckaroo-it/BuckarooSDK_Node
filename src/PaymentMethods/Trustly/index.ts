import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay } from './Models/Pay'

export default class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'Trustly'
    protected _serviceVersion = 1

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
