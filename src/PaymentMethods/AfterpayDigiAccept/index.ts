import { IRefundRequest, IRequest } from '../../Models';
import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Model/Pay';
import { ServiceCode } from '../../Utils';

export default class AfterpayDigiAccept extends PayablePaymentMethod {
    protected _serviceVersion = 2;

    public defaultServiceCode(): ServiceCode {
        return 'afterpaydigiaccept';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    authorize(payload: IPay) {
        this.setServiceList('Authorize', new Pay(payload));
        return super.transactionRequest(payload);
    }

    cancelAuthorize(payload: IRefundRequest) {
        this.setServiceList('CancelAuthorize');
        return super.transactionRequest(payload);
    }

    capture(payload: IRequest) {
        this.setServiceList('Capture');
        return super.transactionRequest(payload);
    }

    payRemainder(payload: IPay) {
        this.setServiceList('PayRemainder');
        return super.transactionRequest(payload);
    }

    authorizeRemainder(payload: IPay) {
        this.setServiceList('AuthorizeRemainder');
        return super.transactionRequest(payload);
    }
}
