import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { IConfig } from '../../Utils/Types'
import { RefundPayload } from '../../Models/ITransaction'

export default class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'
    protected _serviceVersion = 1
    protected _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    payInInstallments(payload: IPay) {
        this.action = 'PayInInstallments'
        return super.transactionRequest(payload)
    }
}
