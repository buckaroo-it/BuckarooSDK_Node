import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Alipay extends PayablePaymentMethod {

    protected _paymentName = 'alipay'
    protected _serviceVersion = 1

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _alipay:Alipay
const alipay:() => Alipay = () => {
    if (!_alipay)
        _alipay = new Alipay()
    return _alipay
}
export default alipay