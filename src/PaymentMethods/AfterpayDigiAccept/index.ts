import { PayablePaymentMethod } from '../PayablePaymentMethod'

class AfterpayDigiAccept extends PayablePaymentMethod {
    protected _paymentName = 'afterpaydigiaccept'
    pay(payload?) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _afterpaydigiaccept: AfterpayDigiAccept
const afterpaydigiaccept: () => AfterpayDigiAccept = () => {
    if (!_afterpaydigiaccept) _afterpaydigiaccept = new AfterpayDigiAccept()
    return _afterpaydigiaccept
}
export default afterpaydigiaccept
