import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { BankTransferModelStrategy, IPay } from './Models/Pay'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class Banktransfer extends PayablePaymentMethod {
    protected _paymentName = 'transfer'
    protected _serviceVersion = 1
    modelStrategy = new BankTransferModelStrategy({})
    pay(payload: IPay & Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _banktransfer: Banktransfer
const banktransfer: () => Banktransfer = () => {
    if (!_banktransfer) _banktransfer = new Banktransfer()
    return _banktransfer
}
export default banktransfer
export { Banktransfer as BanktransferClass }
