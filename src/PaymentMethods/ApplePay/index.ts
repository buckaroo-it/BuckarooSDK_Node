import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class ApplePay extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'applepay';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    payRedirect(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        return this.transactionRequest();
    }
}
