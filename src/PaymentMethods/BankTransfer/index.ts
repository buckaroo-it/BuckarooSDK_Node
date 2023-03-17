import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Pay } from "./Models/Pay";

class Banktransfer extends PayablePaymentMethod {
    protected _paymentName = 'transfer'
    protected _serviceVersion = 1

    pay(payload) {
        this.servicesStrategy = Pay
        return super.pay(payload)
    }
}

let _banktransfer: Banktransfer
const banktransfer: () => Banktransfer = () => {
    if (!_banktransfer) _banktransfer = new Banktransfer()
    return _banktransfer
}
export default banktransfer
