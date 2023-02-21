import PaymentMethod from '../PaymentMethod'
import { IPayForm } from '../../Models/PayForm'
class WeChatPay extends PaymentMethod {
    // public serviceVersion = 1
    constructor() {
        super({
            paymentName: 'WeChatPay'
        })
    }
}

const wechatpay = new WeChatPay()

const pay = (data: IPayForm) => wechatpay.pay(data, {})

export { pay }
