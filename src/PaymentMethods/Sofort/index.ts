import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';

export default class Sofort extends PayablePaymentMethod {
    protected _serviceVersion = 1;

    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
