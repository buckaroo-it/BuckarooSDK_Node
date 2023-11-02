import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';

export default class KBC extends PayablePaymentMethod {
    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
