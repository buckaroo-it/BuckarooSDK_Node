import { PayablePaymentMethod } from '../PayablePaymentMethod'

class ApplePay extends PayablePaymentMethod {
    protected _paymentName = 'applepay'
    protected _serviceVersion = 1

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
}

let _applepay: ApplePay
const applepay: () => ApplePay = () => {
    if (!_applepay) _applepay = new ApplePay()
    return _applepay
}
export default applepay
