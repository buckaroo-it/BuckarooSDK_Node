import PaymentMethod from './PaymentMethod';
import IRequest, { IPaymentRequest, IRefundRequest } from '../Models/IRequest';
import { uniqid } from '../Utils/Functions';
import { ServiceParameter } from '../Models/ServiceParameters';
import { IParameter } from '../Models/IParameters';
import { ServiceCode } from '../Utils';

export default abstract class PayablePaymentMethod<
    Code extends ServiceCode,
    Manually extends boolean = false
> extends PaymentMethod<Code, Manually> {
    protected _requiredFields: Array<keyof IRequest> = ['currency', 'returnURL', 'returnURLCancel', 'pushURL'];

    pay(payload: IPaymentRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayPayload(payload);
        this.setServiceList('Pay', serviceParameters);
        return this.transactionRequest();
    }

    payRemainder(payload: IPaymentRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayPayload(payload);
        this.setServiceList('PayRemainder', serviceParameters);
        return this.transactionRequest();
    }

    refund(payload: IRefundRequest, serviceParameters?: ServiceParameter | IParameter[]) {
        this.setPayload(payload);
        this.setServiceList('Refund', serviceParameters);
        return this.transactionRequest();
    }

    protected setPayPayload(payload: IRequest) {
        payload.invoice = payload.invoice ?? uniqid();
        payload.order = payload.order ?? uniqid();
        super.setPayload(payload);
    }
}
