import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';

export default class Payconiq extends PayablePaymentMethod {
    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
