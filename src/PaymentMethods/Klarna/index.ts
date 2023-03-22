import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Pay, IPay } from './Models/Pay'
import { IConfig } from '../../Utils/Types'
import { RefundPayload } from '../../Models/ITransaction'

class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'
    protected _serviceVersion = 1
    protected _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']

    pay(payload?: IPay) {
        return super.pay(payload)
    }
    setPayload(payload: IPay) {
        this.servicesStrategy = Pay
        super.setPayload(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    payInInstallments(payload: IPay) {
        this.action = 'PayInInstallments'
        return super.transactionRequest(payload)
    }
}
let _klarna: Klarna
const klarna = () => {
    if (!_klarna) _klarna = new Klarna()
    return _klarna
}
export default klarna
