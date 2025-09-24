import { IPaymentRequest, IRefundRequest, IRequest } from '../../Models';
import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Wero extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'wero';
    }

    authorize(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('Authorize');
        return super.transactionRequest();
    }

    cancelAuthorize(payload: IRefundRequest) {
        this.setServiceList('CancelAuthorize');
        return super.transactionRequest(payload);
    }

    capture(payload: IRequest) {
        this.setPayPayload(payload);
        this.setServiceList('Capture');
        return super.transactionRequest();
    }
}
