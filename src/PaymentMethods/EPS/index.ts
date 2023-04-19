import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

export default class EPS extends PayablePaymentMethod {
    protected _paymentName = 'eps'

    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
