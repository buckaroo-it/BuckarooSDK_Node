import PaymentMethod from '../PaymentMethod'
import { IInvitation, PayPerEmailModelStrategy } from './Models/invitation'
import { uniqid } from '../../Utils/Functions'

class PayPerEmail extends PaymentMethod {
    protected _paymentName = 'payperemail'
    modelStrategy = new PayPerEmailModelStrategy({})
    paymentInvitation(payload: IInvitation) {
        this.action = 'paymentInvitation'
        payload.invoice = payload.invoice || uniqid()
        return super.transactionRequest(payload)
    }
}

let _payPerEmail: PayPerEmail
const payPerEmail: () => PayPerEmail = () => {
    if (!_payPerEmail) _payPerEmail = new PayPerEmail()
    return _payPerEmail
}
export default payPerEmail
export { PayPerEmail as PayPerEmailClass }
