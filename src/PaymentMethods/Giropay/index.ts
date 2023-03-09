import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Giropay extends PayablePaymentMethod {
    protected _paymentName = 'giropay'
    protected _serviceVersion = 1

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _giropay: Giropay
const giropay: () => Giropay = () => {
    if (!_giropay) _giropay = new Giropay()
    return _giropay
}
export default giropay
