import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Surepay extends PayablePaymentMethod {

    protected _paymentName = 'surepay'

    verify (payload){
        this.action = 'verify'
        return super.transactionRequest (payload)
    }
}

let _surepay:Surepay
const surepay:() => Surepay = () => {
    if (!_surepay)
        _surepay = new Surepay()
    return _surepay
}
export default surepay