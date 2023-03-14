import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {Payload, RefundPayload} from "../../Models/ITransaction";

class Belfius extends PayablePaymentMethod {
    protected _paymentName = 'belfius'
    protected _serviceVersion = 1

    pay(payload: Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _belfius: Belfius
const belfius: () => Belfius = () => {
    if (!_belfius) _belfius = new Belfius()
    return _belfius
}
export default belfius
