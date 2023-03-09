import {PayablePaymentMethod} from '../PayablePaymentMethod'

class SEPA extends PayablePaymentMethod {

    protected _paymentName = 'SepaDirectDebit'
    protected _serviceVersion = 1

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
    payrecurring(payload){
        this.action = 'PayRecurring'
        return super.transactionRequest (payload)
    }
    extraInfo(){
        this.action = 'extrainfo'
        return this.dataRequest()
    }
}

let _sepa:SEPA
const sepa:() => SEPA = () => {
    if (!_sepa)
        _sepa = new SEPA()
    return _sepa
}
export default sepa