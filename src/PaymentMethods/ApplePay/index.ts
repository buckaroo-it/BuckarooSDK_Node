import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';

export default class ApplePay<Code extends 'applepay', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'ApplePay';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    payRedirect(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        return this.transactionRequest();
    }
}
