import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';

export default class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName = 'Przelewy24';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
