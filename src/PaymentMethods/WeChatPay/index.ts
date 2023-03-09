import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Wechatpay extends PayablePaymentMethod {

    protected _paymentName = 'wechatpay'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _wechatpay:Wechatpay
const wechatpay:() => Wechatpay = () => {
    if (!_wechatpay)
        _wechatpay = new Wechatpay()
    return _wechatpay
}
export default wechatpay