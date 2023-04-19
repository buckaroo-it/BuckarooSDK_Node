import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/IPay'
import { ICapture, Payload, RefundPayload } from '../../Models/ITransaction'

export default class KlarnaKp extends PayablePaymentMethod {
    protected _paymentName = 'KlarnaKp'
    _serviceVersion = 1
    pay(payload: IPay & Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    reserve(payload: IPay) {
        this.action = 'Reserve'
        return this.dataRequest(payload)
    }
    cancel(payload: IPay) {
        this.action = 'CancelReservation'
        return this.dataRequest(payload)
    }
    update(payload: IPay) {
        this.action = 'UpdateReservation'
        return this.dataRequest(payload)
    }
    extend(payload: IPay) {
        this.action = 'ExtendReservation'
        return this.dataRequest(payload)
    }
    addShippingInfo(payload: ICapture) {
        this.action = 'AddShippingInfo'
        return this.dataRequest(payload)
    }
}
