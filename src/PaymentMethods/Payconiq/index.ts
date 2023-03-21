import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class Payconiq extends PayablePaymentMethod {
    protected _paymentName = 'payconiq'

    pay(payload: Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _payconiq: Payconiq
const payconiq: () => Payconiq = () => {
    if (!_payconiq) _payconiq = new Payconiq()
    return _payconiq
}
export default payconiq
