import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Paypal extends PayablePaymentMethod {

    protected _paymentName = 'paypal'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
    payrecurring(payload){
        this.action = 'PayRecurring'
        return super.transactionRequest (payload)
    }
    extraInfo(){
        this.action = 'extrainfo'
        return this.dataRequest()
    }
}

let _paypal:Paypal
const paypal:() => Paypal = () => {
    if (!_paypal)
        _paypal = new Paypal()
    return _paypal
}
export default paypal