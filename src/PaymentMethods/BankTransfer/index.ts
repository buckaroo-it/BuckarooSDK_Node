import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Banktransfer extends PayablePaymentMethod {
    protected _paymentName = 'transfer'
    protected _serviceVersion = 1

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
