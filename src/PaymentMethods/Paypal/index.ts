import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { ICapture, RefundPayload } from '../../Models/ITransaction'
import { IPay } from './Models/Pay'
import { IExtraInfo } from './Models/ExtraInfo'

export default class Paypal extends PayablePaymentMethod {
    protected _paymentName = 'paypal'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    payRecurring(payload: ICapture) {
        this.action = 'PayRecurring'
        return super.transactionRequest(payload)
    }
    extraInfo(payload: IExtraInfo) {
        this.action = 'Pay,ExtraInfo'
        return super.transactionRequest(payload)
    }
}
