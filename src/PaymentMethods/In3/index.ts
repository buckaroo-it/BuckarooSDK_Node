import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import Pay, { IPay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class In3 extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'In3';
    }

    pay(payload: IPaymentRequest) {
        return super.pay(payload, new Pay(payload));
    }

    authorize(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('Authorize', new Pay(payload));
        return this.transactionRequest();
    }

    capture(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('Capture', new Pay(payload));
        return this.transactionRequest();
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
