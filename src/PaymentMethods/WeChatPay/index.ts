import PayablePaymentMethod from '../PayablePaymentMethod'
import { IRefundRequest, IPaymentRequest } from '../../Models/IRequest'

interface IPay extends IPaymentRequest {
    locale: 'en-US' | 'zh-CN' | 'zh-TW'
}
export default class WeChatPay extends PayablePaymentMethod {
    protected _paymentName = 'WeChatPay'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
