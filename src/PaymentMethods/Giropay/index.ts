import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Pay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

export default class Giropay extends PayablePaymentMethod {
    protected _paymentName = 'giropay'
    protected _serviceVersion = 1

    pay(payload: Pay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
