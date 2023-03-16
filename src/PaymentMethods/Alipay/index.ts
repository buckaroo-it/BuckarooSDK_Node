import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { Payload, RefundPayload } from '../../Models/ITransaction'

class Alipay extends PayablePaymentMethod {
    protected _paymentName = 'alipay'
    protected _serviceVersion = 1

    pay(payload: { useMobileView: boolean } & Payload) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _alipay: Alipay
const alipay: () => Alipay = () => {
    if (!_alipay) _alipay = new Alipay()
    return _alipay
}
export default alipay
