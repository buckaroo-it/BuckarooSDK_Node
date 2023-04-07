import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

export default class KBC extends PayablePaymentMethod {
    protected _paymentName = 'kbcpaymentbutton'
    protected _serviceVersion = 1

    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
