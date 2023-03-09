import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'tinka'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _tinka: Tinka
const tinka: () => Tinka = () => {
    if (!_tinka) _tinka = new Tinka()
    return _tinka
}
export default tinka
