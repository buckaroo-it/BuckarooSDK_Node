import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

export default class In3 extends PayablePaymentMethod {
    protected _paymentName = 'capayable'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    payInInstallments(payload: IPay) {
        this.action = 'PayInInstallments'
        return super.payTransaction(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
