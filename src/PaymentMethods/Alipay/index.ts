import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

export default class Alipay extends PayablePaymentMethod {
    protected _paymentName = 'alipay'
    protected _serviceVersion = 1

    pay(payload: { useMobileView: boolean } & Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
