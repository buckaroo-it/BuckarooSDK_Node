import { PayablePaymentMethod } from '../PayablePaymentMethod'

class GiftCard extends PayablePaymentMethod {
    constructor(name: string) {
        super()
        this._paymentName = name
    }
    setName(name: string) {
        this._paymentName = name
    }
    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _giftCard: GiftCard
const giftCard: (name?: string) => GiftCard = (name: string | undefined) => {
    if (!_giftCard)
        if (!name) throw new Error('No name provided for giftcard')
        else _giftCard = new GiftCard(name)

    return _giftCard
}
export default giftCard
