import PaymentMethod from '../PaymentMethod'
import { IInvitation } from './Models/invitation'
import { uniqid } from '../../Utils/Functions'

export default class PayPerEmail extends PaymentMethod {
    protected _paymentName = 'payperemail'

    paymentInvitation(payload: IInvitation) {
        this.action = 'paymentInvitation'
        payload.invoice = payload.invoice || uniqid()
        return super.transactionRequest(payload)
    }
}
