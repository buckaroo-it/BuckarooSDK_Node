import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

export default class GiftCard extends PayablePaymentMethod {
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
