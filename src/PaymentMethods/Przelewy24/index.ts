import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { IPay, Pay } from './Models/Pay';

export default class Przelewy24 extends PayablePaymentMethod {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
