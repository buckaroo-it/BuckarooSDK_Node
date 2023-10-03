import PaymentMethod from '../PaymentMethod'
import { ISplit, ITransfer } from './Models/ISplit'

export default class Marketplaces extends PaymentMethod {
    protected _paymentName = 'Marketplaces'
    split(payload: ISplit) {
        this.setServiceList('Split')
        return this.dataRequest(payload)
    }
    transfer(payload: ITransfer) {
        this.setServiceList('Transfer')
        return this.dataRequest(payload)
    }
    refundSupplementary(payload: ISplit) {
        this.setServiceList('RefundSupplementary')
        return this.dataRequest(payload)
    }
}
