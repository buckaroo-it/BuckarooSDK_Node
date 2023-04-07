import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Model/Pay'
import { ICapture, RefundPayload } from '../../Models/ITransaction'
import { IAfterPayArticle } from './Model/Article'

export default class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1
    pay(payload: IPay) {
        if (payload.billingCustomer) {
            payload.shippingCustomer = payload.shippingCustomer || { ...payload.billingCustomer }
        }
        return super.pay(payload)
    }
    refund(payload: RefundPayload & { articles?: IAfterPayArticle[] }) {
        return super.refund(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return super.payTransaction(payload)
    }
    cancelAuthorize(payload: RefundPayload) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload: ICapture) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    payRemainder(payload) {
        this.action = 'PayRemainder'
        return super.transactionRequest(payload)
    }
    authorizeRemainder(payload) {
        this.action = 'AuthorizeRemainder'
        return super.transactionRequest(payload)
    }
}
