import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, Pay } from './Models/Pay'

class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'Trustly'

    pay(payload: IPay) {
        this.serviceParametersStrategy = Pay
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
let _trustly: Trustly
const trustly: () => Trustly = () => {
    if (!_trustly) _trustly = new Trustly()
    return _trustly
}
export default trustly
