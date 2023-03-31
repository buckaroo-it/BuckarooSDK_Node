import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, TinkaModelStrategy } from './Models/Pay'

class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'tinka'
    modelStrategy = new TinkaModelStrategy({})
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _tinka: Tinka
const tinka: () => Tinka = () => {
    if (!_tinka) _tinka = new Tinka()
    return _tinka
}
export default tinka
export { Tinka as TinkaClass }
