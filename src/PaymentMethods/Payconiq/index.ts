import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';

export default class Payconiq<Code extends 'payconiq', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
