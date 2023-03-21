import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class Sofort extends PayablePaymentMethod {
    protected _paymentName = 'sofortueberweisung'
    protected _serviceVersion = 1

    pay(payload: Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _sofort: Sofort
const sofort: () => Sofort = () => {
    if (!_sofort) _sofort = new Sofort()
    return _sofort
}
export default sofort
