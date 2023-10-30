import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import { IPay, Pay } from './Models/Pay';

export default class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'Trustly';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
