import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { ICapture, RefundPayload } from '../../Models/ITransaction'

export default class Billink extends PayablePaymentMethod {
    protected _paymentName = 'Billink'
    protected _serviceVersion = 1
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload: RefundPayload) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload: ICapture) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
}