import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';

export default class Belfius extends PayablePaymentMethod {
    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
