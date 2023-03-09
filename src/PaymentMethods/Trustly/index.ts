import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'trustly'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}
let _trustly: Trustly
const trustly: () => Trustly = () => {
    if (!_trustly) _trustly = new Trustly()
    return _trustly
}
export default trustly
