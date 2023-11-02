import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IPaymentRequest, IRefundRequest } from '../../Models';

export default class ApplePay extends PayablePaymentMethod {
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
