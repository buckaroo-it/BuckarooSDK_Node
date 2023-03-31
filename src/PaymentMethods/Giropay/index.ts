import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Pay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

class Giropay extends PayablePaymentMethod {
    protected _paymentName = 'giropay'
    protected _serviceVersion = 1

    pay(payload: Pay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _giropay: Giropay
const giropay: () => Giropay = () => {
    if (!_giropay) _giropay = new Giropay()
    return _giropay
}
export default giropay
export { Giropay as GiropayClass }
