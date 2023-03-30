import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, AfterPayModelStrategy } from './Model/Services'
import { ICapture, RefundPayload } from '../../Models/ITransaction'
import { IAfterPayArticle } from "./Model/Article";


class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1
    public modelStrategy = new AfterPayModelStrategy({})
    pay(payload:IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload & { articles?:IAfterPayArticle[] }) {
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
    capture(payload: ICapture & {articles?:IAfterPayArticle[]}) {
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
let _afterpay: Afterpay
const afterpay: () => Afterpay = () => {
    if (!_afterpay) _afterpay = new Afterpay()
    return _afterpay
}
export default afterpay
export { Afterpay as AfterpayClass }