import PaymentMethod from "./PaymentMethod";
import { IParameter, IPaymentRequest, IRefundRequest, IRequest, ServiceParameter } from "../Models";
import { uniqid } from "../Utils";

export default abstract class PayablePaymentMethod extends PaymentMethod {
    protected _requiredFields: Array<keyof IRequest> = ["currency", "returnURL", "returnURLCancel", "pushURL"];

    pay(payload: IPaymentRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayPayload(payload);
        this.setServiceList("Pay", serviceParameters);
        return this.transactionRequest();
    }

    payRemainder(payload: IPaymentRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayPayload(payload);
        this.setServiceList("PayRemainder", serviceParameters);
        return this.transactionRequest();
    }

    refund(payload: IRefundRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayload(payload);
        this.setServiceList("Refund", serviceParameters);
        return this.transactionRequest();
    }

    protected setPayPayload(payload: IRequest) {
        payload.invoice = payload.invoice ?? uniqid();
        payload.order = payload.order ?? uniqid();
        super.setPayload(payload);
    }
}
