import PaymentMethod from '../PaymentMethod'
import { IInvitation } from './Models/invitation'
import { uniqid } from '../../Utils/Functions'

//ToDO Add the service parameter models
export default class PayPerEmail extends PaymentMethod {
    protected _paymentName = 'PayPerEmail'
    paymentInvitation(payload: IInvitation) {
        payload.invoice = payload.invoice || uniqid()
        this.setServiceList('paymentInvitation')
        return super.transactionRequest(payload)
    }
}
