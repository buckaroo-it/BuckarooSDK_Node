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
        return this.transactionRequest(payload)
    }
    payOneClick(payload: IPayOneClick) {
        this.action = 'PayOneClick'
        this.request.setDataKey('invoice', payload.invoice || uniqid())
        return this.transactionRequest(payload)
    }
    payEncrypted(payload: IPayEncrypted) {
        this.action = 'PayEncrypted'
        return this.transactionRequest(payload)
    }
    completePayment(payload: IPayComplete) {
        this.action = 'CompletePayment'
        return this.dataRequest(payload)
    }
    payRecurring(payload: IPayOneClick) {
        this.action = 'PayRecurring'
        this.request.setDataKey('invoice', payload.invoice || uniqid())
        return this.transactionRequest(payload)
    }
}

let _bancontact: Bancontact
export const bancontact: () => Bancontact = () => {
    if (!_bancontact) _bancontact = new Bancontact()
    return _bancontact
}
export default bancontact
