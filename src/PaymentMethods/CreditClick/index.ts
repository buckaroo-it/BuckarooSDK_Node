import { PayablePaymentMethod } from '../PayablePaymentMethod'

class CreditClick extends PayablePaymentMethod {
    protected _paymentName = 'creditclick'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _creditClick: CreditClick
const creditClick: () => CreditClick = () => {
    if (!_creditClick) _creditClick = new CreditClick()
    return _creditClick
}
export default creditClick
