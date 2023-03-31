import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'

class ApplePay extends PayablePaymentMethod {
    protected _paymentName = 'applepay'
    protected _serviceVersion = 1

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _applepay: ApplePay
const applepay: () => ApplePay = () => {
    if (!_applepay) _applepay = new ApplePay()
    return _applepay
}
export default applepay
export { ApplePay as ApplePayClass }
