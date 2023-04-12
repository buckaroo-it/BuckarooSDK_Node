import AfterpayClass from '../Afterpay'
import {Payload, RefundPayload} from "../../Models/ITransaction";
import {IPay} from "../Afterpay/Model/Pay";

export default class AfterpayDigiAccept extends AfterpayClass {
    protected _paymentName = 'afterpaydigiaccept'
    protected _serviceVersion = 2
    pay(payload:Payload) {
        return super.pay(<IPay>payload)
    }
    refund(payload:RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload:Payload) {
        return super.authorize(<IPay>payload)
    }
}
