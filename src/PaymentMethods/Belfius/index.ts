import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Belfius extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'belfius';
    }

    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
