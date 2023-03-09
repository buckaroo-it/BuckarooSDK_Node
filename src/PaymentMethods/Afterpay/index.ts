import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Afterpay extends PayablePaymentMethod {

    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1

    pay(payload?) {
        return super.pay(payload);
    }
    authorize (payload){
        this.action = 'Authorize'
        return super.transactionRequest (payload)
    }
    cancelAuthorize(payload){
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _afterpay:Afterpay
const afterpay:() => Afterpay = () => {
    if (!_afterpay)
        _afterpay = new Afterpay()
    return _afterpay
}
export default afterpay