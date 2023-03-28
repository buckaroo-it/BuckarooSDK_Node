import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, Pay } from './Models/Pay'
import {ICapture, ITransaction, RefundPayload} from '../../Models/ITransaction'
import { ExtraInfo, IExtraInfo } from './Models/ExtraInfo'
import { IEmandate } from './Models/Emandate'
import { uniqid } from '../../Utils/Functions'

class SEPA extends PayablePaymentMethod {
    protected _paymentName = 'SepaDirectDebit'
    protected _serviceVersion = 1

    pay(payload: IPay) {
        this.serviceParametersStrategy = Pay
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        this.serviceParametersStrategy = Pay
        return super.transactionRequest(payload)
    }
    payRecurrent(payload: Pick<IPay, 'collectDate'> & ICapture) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
    extraInfo(payload: IExtraInfo) {
        this.action = 'Pay,ExtraInfo'
        return super.transactionRequest(<ITransaction>ExtraInfo(payload))
    }
    payWithEmandate(payload: IEmandate) {
        this.action = 'PayWithEmandate'
        payload.invoice = payload.invoice || uniqid()
        return super.transactionRequest(payload)
    }
}

let _sepa: SEPA
const sepa: () => SEPA = () => {
    if (!_sepa) _sepa = new SEPA()
    return _sepa
}
export default sepa
