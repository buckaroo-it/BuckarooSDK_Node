import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Giftcard extends PayablePaymentMethod {
    protected _paymentName = 'boekenbon'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _giftcard: Giftcard
const giftcard: () => Giftcard = () => {
    if (!_giftcard) _giftcard = new Giftcard()
    return _giftcard
}
export default giftcard
