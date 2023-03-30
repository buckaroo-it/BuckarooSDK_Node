import { PayablePaymentMethod } from '../PayablePaymentMethod'

class EPS extends PayablePaymentMethod {
    protected _paymentName = 'eps'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _eps: EPS
const eps: () => EPS = () => {
    if (!_eps) _eps = new EPS()
    return _eps
}
export default eps
export { EPS as EPSClass }