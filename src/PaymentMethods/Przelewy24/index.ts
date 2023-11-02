import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { IPay, Pay } from './Models/Pay';

export default class Przelewy24<
    Code extends 'przelewy24',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
