import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';
import { ExtraInfo, IExtraInfo } from './Models/ExtraInfo';

export default class Paypal extends PayablePaymentMethod {
    protected _paymentName = 'Paypal';

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
