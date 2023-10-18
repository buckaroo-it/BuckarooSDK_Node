import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';
import { IRefund, Refund } from './Models/Refund';
import { Capture, ICapture } from './Models/Capture';

export default class Billink extends PayablePaymentMethod {
    protected _paymentName = 'Billink';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload));
    }

    authorize(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('Authorize', new Pay(payload));
        return super.transactionRequest();
    }

    cancelAuthorize(payload: IRefund) {
        this.setPayload(payload);
        this.setServiceList('CancelAuthorize', new Refund(payload));
        return super.transactionRequest();
    }

    capture(payload: ICapture) {
        this.setPayPayload(payload);
        this.setServiceList('Capture', new Capture(payload));
        return super.transactionRequest();
    }
}
