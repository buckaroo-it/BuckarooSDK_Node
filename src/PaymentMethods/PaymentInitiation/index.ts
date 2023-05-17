import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import IPay from "./Models/IPay";

export default class PaymentInitiation extends PayablePaymentMethod {
    protected _paymentName = 'PayByBank'
    _serviceVersion = 1
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
