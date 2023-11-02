import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import Pay from './Models/Pay';

export default class In3 extends PayablePaymentMethod {
    pay(payload: IPaymentRequest) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
