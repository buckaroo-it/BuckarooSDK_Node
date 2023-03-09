import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Sofort extends PayablePaymentMethod {
    protected _paymentName = 'sofortueberweisung'
    protected _serviceVersion = 1

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _sofort: Sofort
const sofort: () => Sofort = () => {
    if (!_sofort) _sofort = new Sofort()
    return _sofort
}
export default sofort
