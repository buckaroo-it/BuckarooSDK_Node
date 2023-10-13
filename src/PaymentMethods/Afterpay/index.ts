import { IPay, Pay } from './Model/Pay';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';
import PayablePaymentMethod from '../PayablePaymentMethod';
import { IRefund, Refund } from './Model/Refund';

export default class Afterpay extends PayablePaymentMethod {
    protected _paymentName = 'Afterpay';
    protected _serviceVersion = 1;
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload));
    }
    authorize(payload: IPay) {
        this.setServiceList('Authorize', new Pay(payload));
        return this.transactionRequest(payload);
    }
    cancelAuthorize(payload: IRefundRequest) {
        this.setServiceList('CancelAuthorize');
        return super.transactionRequest(payload);
    }
    capture(payload: IPaymentRequest) {
        this.setServiceList('Capture', new Pay(payload));
        return super.transactionRequest(payload);
    }
    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }
    authorizeRemainder(payload: IPay) {
        this.setServiceList('AuthorizeRemainder', new Pay(payload));
        return super.transactionRequest(payload);
    }
}
