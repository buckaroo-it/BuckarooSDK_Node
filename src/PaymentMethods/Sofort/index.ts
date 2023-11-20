import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Sofort extends PayablePaymentMethod {
    protected _serviceVersion = 1;

    public defaultServiceCode(): ServiceCode {
        return 'sofortueberweisung';
    }

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
