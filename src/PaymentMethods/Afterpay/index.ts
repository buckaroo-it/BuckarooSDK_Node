import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {IPay, afterPayServices} from './Model/Services'
import {ICapture, RefundPayload} from "../../Models/ITransaction";
class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1
    protected services = afterPayServices
    pay(payload?:IPay) {
        return super.pay(payload)
    }
    authorize(payload?:IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload?:Omit<ICapture,'articles'>) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload?:ICapture) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    refund(payload?:IPay & RefundPayload) {
        return super.refund(payload)
    }
}

let _afterpay: Afterpay
const afterpay: () => Afterpay = () => {
    if (!_afterpay) _afterpay = new Afterpay()
    return _afterpay
}
export default afterpay
