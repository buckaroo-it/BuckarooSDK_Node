import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, TrustlyModelStrategy } from './Models/Pay'

class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'Trustly'

    modelStrategy = new TrustlyModelStrategy({})
    pay(payload: IPay) {
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
export { Trustly as TrustlyClass }
