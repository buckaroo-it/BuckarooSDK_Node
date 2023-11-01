import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPaymentRequest, IRefundRequest } from '../../Models';

export default class Belfius<Code extends 'belfius', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {

    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
