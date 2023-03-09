import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Bancontact extends PayablePaymentMethod {
    protected _paymentName = 'bancontactmrcash'
    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
    authenticate(payload) {
        this.action = 'Authenticate'
        return super.transactionRequest(payload)
    }
    payOneClick(payload) {
        this.action = 'PayOneClick'
        return super.transactionRequest(payload)
    }
    payEncrypted(payload) {
        this.action = 'PayEncrypted'
        return super.transactionRequest(payload)
    }
    completedPayment() {
        this.action = 'CompletedPayment'
        return this.dataRequest()
    }
    payRecurring() {
        this.action = 'PayRecurring'
        return super.transactionRequest()
    }
}

let _bancontact: Bancontact
const bancontact: () => Bancontact = () => {
    if (!_bancontact) _bancontact = new Bancontact()
    return _bancontact
}
export default bancontact
