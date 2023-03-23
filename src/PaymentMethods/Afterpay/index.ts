import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay, Pay } from './Model/Services'
import { ICapture, RefundPayload } from '../../Models/ITransaction'

class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'afterpay'
    protected _serviceVersion = 1
    pay(payload?: IPay) {
        return super.pay(payload)
    }
    setPayload(payload: IPay) {
        this.servicesStrategy = Pay
        super.setPayload(payload)
    }
    authorize(payload?: IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload?: ICapture) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload?: ICapture & Partial<Pick<IPay, 'articles'>>) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    refund(payload?: Partial<Pick<IPay, 'articles'>> & RefundPayload) {
        return super.refund(payload)
    }
}

let _afterpay: Afterpay
const afterpay: () => Afterpay = () => {
    if (!_afterpay) _afterpay = new Afterpay()
    return _afterpay
}
export default afterpay
