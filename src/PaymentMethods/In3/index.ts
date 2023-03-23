import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, Pay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

class In3 extends PayablePaymentMethod {
    protected _paymentName = 'capayable'

    pay(payload: IPay) {
        this.servicesStrategy = Pay
        return super.pay(payload)
    }
    payInInstallments(payload) {
        this.action = 'PayInInstallments'
        this.servicesStrategy = Pay
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
