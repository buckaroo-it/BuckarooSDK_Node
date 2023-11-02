import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';

export default class Payconiq<Code extends 'payconiq', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
