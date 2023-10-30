import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';

export default class Przelewy24<
    Code extends 'przelewy24',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    protected _paymentName = 'Przelewy24';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
