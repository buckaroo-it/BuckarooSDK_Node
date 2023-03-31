import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class GiftCard extends PayablePaymentMethod {
    pay(payload: Payload & { name: string }) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload & { name: string }) {
        return super.refund(payload)
    }
    setRequest(payload: any) {
        this.paymentName = payload.name || this._paymentName
        delete payload.name
        super.setRequest(payload)
    }
}

let _giftCard: GiftCard
const giftCard: () => GiftCard = () => {
    if (!_giftCard) _giftCard = new GiftCard()

    return _giftCard
}
export default giftCard
export { GiftCard as GiftCardClass }
