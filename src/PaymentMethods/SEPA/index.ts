import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { ICapture, RefundPayload } from '../../Models/ITransaction'
import { IExtraInfo } from './Models/ExtraInfo'
import { IEmandate } from './Models/Emandate'
import { uniqid } from '../../Utils/Functions'

export default class SEPA extends PayablePaymentMethod {
    protected _paymentName = 'SepaDirectDebit'
    protected _serviceVersion = 1
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    payRecurrent(payload: Pick<IPay, 'collectDate'> & ICapture) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
    extraInfo(payload: IExtraInfo) {
        this.action = 'Pay,ExtraInfo'
        return super.transactionRequest(payload)
    }
    payWithEmandate(payload: IEmandate) {
        this.action = 'PayWithEmandate'
        payload.invoice = payload.invoice || uniqid()
        return super.transactionRequest(payload)
    }
}
