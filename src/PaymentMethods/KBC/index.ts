import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';

export default class KBC<
    Code extends 'KBCPaymentButton',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
