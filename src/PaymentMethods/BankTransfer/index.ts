import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { BankTransferModelStrategy } from './Models/Pay'

class Banktransfer extends PayablePaymentMethod {
    protected _paymentName = 'transfer'
    protected _serviceVersion = 1
    modelStrategy = new BankTransferModelStrategy({})
    pay(payload) {
        return super.pay(payload)
    }
}

let _banktransfer: Banktransfer
const banktransfer: () => Banktransfer = () => {
    if (!_banktransfer) _banktransfer = new Banktransfer()
    return _banktransfer
}
export default banktransfer
export { Banktransfer as BanktransferClass }