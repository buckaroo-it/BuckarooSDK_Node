import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, Services } from './Model/Services'
import {ICapture, Payload, RefundPayload} from '../../Models/ITransaction'
import {IAfterPayArticleRefund} from "./Model/Article";

class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1

    serviceParametersStrategy(data) {
        return super.serviceParametersStrategy(Services(data));
    }

    pay(payload: IPay) {
        return super.pay(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return super.payTransaction(payload)
    }
    cancelAuthorize(payload: RefundPayload) {
        this.action = 'CancelAuthorize'
        this.setRequest(payload)
        return super.transactionRequest()
    }
    capture(payload: ICapture & {articles?:IAfterPayArticleRefund[]}) {
        this.action = 'Capture'
        return super.transactionRequest()
    }
    refund(payload: RefundPayload & {articles?:IAfterPayArticleRefund[]}) {
        return super.refund(payload)
    }
}

let _afterpay: Afterpay
const afterpay: () => Afterpay = () => {
    if (!_afterpay) _afterpay = new Afterpay()
    return _afterpay
}
export default afterpay
