import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Payconiq extends PayablePaymentMethod {
    protected _paymentName = 'payconiq'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _payconiq: Payconiq
const payconiq: () => Payconiq = () => {
    if (!_payconiq) _payconiq = new Payconiq()
    return _payconiq
}
export default payconiq
