import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Creditcard extends PayablePaymentMethod {

    protected _paymentName = 'creditcard'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
    payEncrypted(payload){
        this.action = 'PayEncrypted'
        return super.pay (payload)
    }
    payWithSecurityCode(payload){
        this.action ='PayWithSecurityCode'
        return super.pay(payload)

    }
    authorize (payload){
        this.action = 'Authorize'
        return super.transactionRequest (payload)
    }
    authorizeWithSecurityCode (payload){
        this.action = 'Authorizewithsecuritycode'
        return super.transactionRequest (payload)
    }
    authorizeEncrypted (payload){
        this.action = 'AuthorizeEncrypted'
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
    payrecurrent(payload) {
        this.action = 'Payrecurrent'
        return super.transactionRequest(payload)
    }

}

let _creditcard:Creditcard
const creditcard:() => Creditcard = () => {
    if (!_creditcard)
        _creditcard = new Creditcard()
    return _creditcard
}
export default creditcard