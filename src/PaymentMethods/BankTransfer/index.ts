import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

export default class Banktransfer extends PayablePaymentMethod {
    protected _paymentName = 'transfer'
    protected _serviceVersion = 1
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
