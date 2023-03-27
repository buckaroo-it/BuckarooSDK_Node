import PaymentMethod from '../PaymentMethod'
import { Invitation, services } from './Models/invitation'
import { uniqid } from '../../Utils/Functions'

class PayPerEmail extends PaymentMethod {
    protected _paymentName = 'payperemail'
    paymentInvitation(payload: Invitation) {
        this.action = 'paymentInvitation'
        payload.invoice = payload.invoice || uniqid()
        this.serviceParametersStrategy = services
        this.setRequest(payload)
        return super.transactionRequest()
    }
}

let _payPerEmail: PayPerEmail
const payPerEmail: () => PayPerEmail = () => {
    if (!_payPerEmail) _payPerEmail = new PayPerEmail()
    return _payPerEmail
}
export default payPerEmail
