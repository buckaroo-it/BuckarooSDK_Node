import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';

export default class KBC<
    Code extends 'KBCPaymentButton',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
