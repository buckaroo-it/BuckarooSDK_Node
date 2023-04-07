import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay } from './Models/Pay'

export default class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName = 'Przelewy24'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
