import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

interface IPay extends Payload {
    locale: 'en-US' | 'zh-CN' | 'zh-TW'
}
class Wechatpay extends PayablePaymentMethod {
    protected _paymentName = 'wechatpay'

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _wechatpay: Wechatpay
const wechatpay: () => Wechatpay = () => {
    if (!_wechatpay) _wechatpay = new Wechatpay()
    return _wechatpay
}
export default wechatpay
export { Wechatpay as WechatpayClass }
