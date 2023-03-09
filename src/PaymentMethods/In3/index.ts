import { PayablePaymentMethod } from '../PayablePaymentMethod'

class In3 extends PayablePaymentMethod {
    protected _paymentName = 'capayable'

    payininstallments(payload) {
        this.action = 'payininstallments'
        return super.transactionRequest(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _in3: In3
const in3: () => In3 = () => {
    if (!_in3) _in3 = new In3()
    return _in3
}
export default in3
