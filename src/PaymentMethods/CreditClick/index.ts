import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Creditclick extends PayablePaymentMethod {

    protected _paymentName = 'creditclick'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _creditclick:Creditclick
const creditclick:() => Creditclick = () => {
    if (!_creditclick)
        _creditclick = new Creditclick()
    return _creditclick
}
export default creditclick