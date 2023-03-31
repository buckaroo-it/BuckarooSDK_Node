import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, IPayComplete, IPayEncrypted, IPayOneClick } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

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
        return this.payTransaction(payload)
    }
    payOneClick(payload: IPayOneClick) {
        this.action = 'PayOneClick'
        return this.transactionInvoice(payload)
    }
    payEncrypted(payload: IPayEncrypted) {
        this.action = 'PayEncrypted'
        return this.transactionInvoice(payload)
    }
    completePayment(payload: IPayComplete) {
        this.action = 'CompletePayment'
        return this.dataRequest(payload)
    }
    payRecurring(payload: IPayOneClick) {
        this.action = 'PayRecurring'
        return this.transactionInvoice(payload)
    }
}

let _bancontact: Bancontact
export const bancontact: () => Bancontact = () => {
    if (!_bancontact) _bancontact = new Bancontact()
    return _bancontact
}
export default bancontact
export { Bancontact as BancontactClass }
