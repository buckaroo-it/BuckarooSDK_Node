import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Services, IPay } from './Models/Pay'
import { IConfig } from '../../Utils/Types'
import { RefundPayload } from '../../Models/ITransaction'
import { TransactionResponse } from '../../Models/TransactionResponse'

class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'
    protected _serviceVersion = 1
    protected requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']

    protected services = (payload) => Services(payload)
    pay(payload: IPay): Promise<TransactionResponse> {
        return super.pay(payload)
    }
    setPayload(payload: IPay) {
        super.setPayload(payload)
    }
    refund(payload: RefundPayload) {
        this.action = 'Refund'
        // return super.pay(payload)
    }
    payInInstallments(payload) {
        this.action = 'PayInInstallments'
        return super.pay(payload)
    }
}
let _klarna:Klarna;
const klarna = () => {
    if (!_klarna)
        _klarna = new Klarna()
    return _klarna
}
export default klarna