import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';

export default class Trustly<Code extends 'trustly', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
