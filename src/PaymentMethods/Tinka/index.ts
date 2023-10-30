import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';

export default class Tinka<Code extends 'tinka', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'Tinka';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
