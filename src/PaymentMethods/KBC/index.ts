import {PayablePaymentMethod} from '../PayablePaymentMethod'

class KBC extends PayablePaymentMethod {

    protected _paymentName = 'kbcpaymentbutton'
    protected _serviceVersion = 1


    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _kbc:KBC
const kbc:() => KBC = () => {
    if (!_kbc)
        _kbc = new KBC()
    return _kbc
}
export default kbc