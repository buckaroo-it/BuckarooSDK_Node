import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay } from './Models/Pay'

export default class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'tinka'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
