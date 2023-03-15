import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {IEncrypted, ISecurityCodePay} from "./Models/Pay";
import {ICapture, Payload, RefundPayload} from "../../Models/ITransaction";

class Creditcard extends PayablePaymentMethod {

    constructor(name:string) {
        super();
        this._paymentName = name
    }
    setCreditCardName(name:string) {
        this._paymentName = name
    }
    pay(payload:Payload) {
        return super.pay(payload)
    }
    refund(payload:RefundPayload) {
        return super.refund(payload)
    }
    payEncrypted(payload:IEncrypted) {
        this.action = 'PayEncrypted'
        return super.pay(payload)
    }
    payWithSecurityCode(payload:ISecurityCodePay) {
        this.action = 'PayWithSecurityCode'
        return super.pay(payload)
    }
    authorize(payload:Payload) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    authorizeWithSecurityCode(payload:ISecurityCodePay) {
        this.action = 'AuthorizeWithSecurityCode'
        return super.transactionRequest(payload)
    }
    authorizeEncrypted(payload) {
        this.action = 'AuthorizeEncrypted'
        return super.transactionRequest(payload)
    }
    cancelAuthorize(payload:RefundPayload) {
        this.action = 'CancelAuthorize'
        return super.transactionRequest(payload)
    }
    capture(payload:ICapture) {
        this.action = 'Capture'
        return super.transactionRequest(payload)
    }
    payRecurrent(payload:ICapture) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
}
let _creditcard: Creditcard

const creditcard: (name?:string) => Creditcard = (name?:string) => {
    if (!_creditcard){
        if (!name) {
            throw new Error('Creditcard name is required')
        }
        _creditcard = new Creditcard(name)
    }
    return _creditcard
}
export default creditcard
