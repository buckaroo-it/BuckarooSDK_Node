import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';

export default class KBC extends PayablePaymentMethod {
    protected _paymentName = 'KBC';

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
