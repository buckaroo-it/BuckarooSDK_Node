import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, IPayComplete, IPayEncrypted, IPayOneClick } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'
import { uniqid } from '../../Utils/Functions'

class Bancontact extends PayablePaymentMethod {
    protected _paymentName = 'bancontactmrcash'
    protected _serviceVersion = 1
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authenticate(payload: IPay) {
        this.action = 'Authenticate'
        return super.transactionRequest(payload)
    }
    payOneClick(payload: IPayOneClick) {
        this.action = 'PayOneClick'
        payload.invoice = payload.invoice || uniqid()
        this.setRequest(payload)
        return super.transactionRequest()
    }
    payEncrypted(payload: IPayEncrypted) {
        this.action = 'PayEncrypted'
        return super.transactionRequest(payload)
    }
    completePayment(payload: IPayComplete) {
        this.action = 'CompletePayment'
        this.setRequest(payload)
        return this.dataRequest()
    }
    payRecurring(payload: IPayOneClick) {
        this.action = 'PayRecurring'
        payload.invoice = payload.invoice || uniqid()
        this.setRequest(payload)
        return super.transactionRequest()
    }
}

let _bancontact: Bancontact
export const bancontact: () => Bancontact = () => {
    if (!_bancontact) _bancontact = new Bancontact()
    return _bancontact
}
export default bancontact
