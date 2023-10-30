import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';

export default class Sofort<
    Code extends 'sofortueberweisung',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    protected _paymentName = 'Sofort';
    protected _serviceVersion = 1;

    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
