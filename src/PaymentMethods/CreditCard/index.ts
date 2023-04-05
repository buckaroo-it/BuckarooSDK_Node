import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IEncrypted, ISecurityCodePay } from './Models/Pay'
import { ICapture, Payload, RefundPayload } from '../../Models/ITransaction'

export type AddName<T> = T & { name: string }
export default class Creditcard extends PayablePaymentMethod {
    pay(payload: AddName<Payload>) {
        return super.pay(payload)
    }
    refund(payload: AddName<RefundPayload>) {
        return super.refund(payload)
    }
    payEncrypted(payload:AddName<IEncrypted>) {
        this.action = 'PayEncrypted'
        return super.pay(payload)
    }
    payWithSecurityCode(payload: AddName<ISecurityCodePay>) {
        this.action = 'PayWithSecurityCode'
        return super.pay(payload)
    }
    authorize(payload: AddName<Payload>) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    authorizeWithSecurityCode(payload: AddName<ISecurityCodePay>) {
        this.action = 'AuthorizeWithSecurityCode'
        return super.transactionRequest(payload)
    }
    authorizeEncrypted(payload: AddName<IEncrypted>) {
        this.action = 'AuthorizeEncrypted'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload: AddName<RefundPayload>) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload: AddName<ICapture>) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    payRecurrent(payload: AddName<ICapture>) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
    setRequest(payload: any) {
        this.paymentName = payload.name || this._paymentName
        delete payload.name
        super.setRequest(payload)
    }
}