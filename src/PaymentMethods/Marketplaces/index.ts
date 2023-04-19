import PaymentMethod from '../PaymentMethod'
import { ISplit, ITransfer } from './Models/ISplit'

export default class Marketplaces extends PaymentMethod {
    protected _paymentName = 'Marketplaces'

    split(payload: ISplit) {
        this.action = 'Split'
        this.setRequest(payload)
        return this
    }
    transfer(payload: ITransfer) {
        this.action = 'Transfer'
        return this.dataRequest(payload)
    }
    refundSupplementary(payload: ISplit = {}) {
        this.action = 'RefundSupplementary'
        this.setRequest(payload)
        return this
    }
}
