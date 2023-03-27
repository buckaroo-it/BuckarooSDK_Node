import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, Pay } from './Models/Pay'

class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'tinka'

    pay(payload: IPay) {
        this.serviceParametersStrategy = Pay
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
