import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class GiftCard extends PayablePaymentMethod {
    pay(payload: Payload & { name: string }) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload & { name: string }) {
        return super.refund(payload)
    }
    setPayload(payload: any) {
        this.paymentName = payload.name || this._paymentName
        delete payload.name
        super.setPayload(payload)
    }
}

let _giftCard: GiftCard
const giftCard: () => GiftCard = () => {
    if (!_giftCard) _giftCard = new GiftCard()

    return _giftCard
}
export default giftCard
