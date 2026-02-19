import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IPaymentRequest, IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class GooglePay extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'googlepay';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }

    payRedirect(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        return this.transactionRequest();
    }
}
