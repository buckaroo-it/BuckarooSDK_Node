import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, In3ModelStrategy } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

class In3 extends PayablePaymentMethod {
    protected _paymentName = 'capayable'
    modelStrategy = new In3ModelStrategy({})
    pay(payload: IPay) {
        return super.pay(payload)
    }
    payInInstallments(payload) {
        this.action = 'PayInInstallments'
        return super.transactionRequest(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _in3: In3
const in3: () => In3 = () => {
    if (!_in3) _in3 = new In3()
    return _in3
}
export default in3
export { In3 as In3Class }
