import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {IPay, payServices} from "./Models/Pay";
import {ICapture, RefundPayload} from "../../Models/ITransaction";

class Billink extends PayablePaymentMethod {
    protected _paymentName = 'Billink'

    pay(payload:IPay) {
        this.servicesStrategy = payServices
        return super.pay()
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload?:IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload:RefundPayload ) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload:ICapture) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
}

let _billink: Billink
const billink: () => Billink = () => {
    if (!_billink) _billink = new Billink()
    return _billink
}
export default billink
