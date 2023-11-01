import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';
import { ExtraInfo, IExtraInfo } from './Models/ExtraInfo';

export default class Paypal<Code extends 'paypal', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    payRecurrent(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('PayRecurring');
        return super.transactionRequest(payload);
    }

    extraInfo(payload: IExtraInfo) {
        this.setPayPayload(payload);
        this.setServiceList('Pay,ExtraInfo', new ExtraInfo(payload));
        return super.transactionRequest(payload);
    }
}
