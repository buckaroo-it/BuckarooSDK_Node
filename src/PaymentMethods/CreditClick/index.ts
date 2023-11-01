import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';
import { IRefund, Refund } from './Models/Refund';

export default class CreditClick<
    Code extends 'creditclick',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload));
    }
}
