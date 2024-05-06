import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Knaken extends PayablePaymentMethod {
    protected _serviceVersion = 1;

    public defaultServiceCode(): ServiceCode {
        return 'knaken';
    }

    pay(payload: IPaymentRequest) {
        return super.pay(payload);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
