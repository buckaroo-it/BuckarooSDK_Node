import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IEncrypted, ISecurityCodePay } from './Models/Pay'
import { ICapture, Payload, RefundPayload } from '../../Models/ITransaction'

class Creditcard extends PayablePaymentMethod {
    pay(payload: Payload & { name: string }) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload & { name: string }) {
        return super.refund(payload)
    }
    payEncrypted(payload: IEncrypted & { name: string }) {
        this.action = 'PayEncrypted'
        return super.pay(payload)
    }
    payWithSecurityCode(payload: ISecurityCodePay & { name: string }) {
        this.action = 'PayWithSecurityCode'
        return super.pay(payload)
    }
    authorize(payload: Payload & { name: string }) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    authorizeWithSecurityCode(payload: ISecurityCodePay & { name: string }) {
        this.action = 'AuthorizeWithSecurityCode'
        return super.transactionRequest(payload)
    }
    authorizeEncrypted(payload: IEncrypted & { name: string }) {
        this.action = 'AuthorizeEncrypted'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload: RefundPayload & { name: string }) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload: ICapture & { name: string }) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    payRecurrent(payload: ICapture & { name: string }) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
    setRequest(payload: any) {
        this.paymentName = payload.name || this._paymentName
        delete payload.name
        super.setRequest(payload)
    }
}
let _creditcard: Creditcard

const creditcard: () => Creditcard = () => {
    if (!_creditcard) {
        _creditcard = new Creditcard()
    }
    return _creditcard
}
export default creditcard
export { Creditcard as CreditcardClass }