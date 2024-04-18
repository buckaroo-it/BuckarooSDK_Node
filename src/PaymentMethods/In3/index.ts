import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import Pay from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class In3 extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'In3';
    }

    pay(payload: IPaymentRequest) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
