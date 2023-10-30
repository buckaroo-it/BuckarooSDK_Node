import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';

export default class KBC<Code extends 'KBCPaymentButton', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'KBC';

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
