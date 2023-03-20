import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {ICapture, RefundPayload} from "../../Models/ITransaction";
import {IPay} from "./Models/Pay";
import {extraInfo, IExtraInfo} from "./Models/ExtraInfo";

class Paypal extends PayablePaymentMethod {
    protected _paymentName = 'paypal'

    pay(payload:IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    payRecurring(payload:ICapture) {
        this.action = 'PayRecurring'
        return super.transactionRequest(payload)
    }
    extraInfo(payload:IExtraInfo) {
        this.action = 'Pay,ExtraInfo'
        this.servicesStrategy = extraInfo
        return super.transactionRequest(payload)
    }
}

let _paypal: Paypal
const paypal: () => Paypal = () => {
    if (!_paypal) _paypal = new Paypal()
    return _paypal
}
export default paypal
