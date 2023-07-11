import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, IPayComplete, IPayEncrypted, IPayOneClick } from './Models/Pay'
import {ICapture, RefundPayload} from '../../Models/ITransaction'

export default class Bancontact extends PayablePaymentMethod {
    protected _paymentName = 'bancontactmrcash'
    protected _serviceVersion = 1

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authenticate(payload: IPay) {
        return this.authorize(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return this.payTransaction(payload)
    }
    payOneClick(payload: IPayOneClick) {
        this.action = 'PayOneClick'
        return this.transactionInvoice(payload)
    }
    payEncrypted(payload: IPayEncrypted) {
        this.action = 'PayEncrypted'
        return this.transactionInvoice(payload)
    }
    completePayment(payload: IPayComplete) {
        this.action = 'CompletePayment'
        return this.dataRequest(payload)
    }
    payRecurring(payload: IPayOneClick) {
        this.action = 'PayRecurring'
        return this.transactionInvoice(payload)
    }
    capture(payload:ICapture) {
        this.action = 'Capture'
        return this.transactionInvoice(payload)
    }
    cancelAuthorize(payload) {
        this.action = 'CancelAuthorize'
        return this.transactionRequest(payload)
    }
}
