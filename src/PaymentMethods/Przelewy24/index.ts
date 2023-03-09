import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Przelewy24 extends PayablePaymentMethod {

    protected _paymentName = 'Przelewy24'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _przelewy24:Przelewy24
const przelewy24:() => Przelewy24 = () => {
    if (!_przelewy24)
        _przelewy24 = new Przelewy24()
    return _przelewy24
}
export default przelewy24