import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Billink extends PayablePaymentMethod {

    protected _paymentName = 'Billink'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
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

}

let _billink:Billink
const billink:() => Billink = () => {
    if (!_billink)
        _billink = new Billink()
    return _billink
}
export default billink