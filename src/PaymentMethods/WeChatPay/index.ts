import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

interface IPay extends Payload {
    locale: 'en-US' | 'zh-CN' | 'zh-TW'
}
export default class Wechatpay extends PayablePaymentMethod {
    protected _paymentName = 'wechatpay'

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
