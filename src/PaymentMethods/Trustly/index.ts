import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { IPay, Pay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class Trustly extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'trustly';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
