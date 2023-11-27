import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';
import { IRequest } from "../../Models";

export default class ExternalPayment extends PayablePaymentMethod {

    private channel: 'BACKOFFICE' | 'POINT-OF-SALE' = 'BACKOFFICE';
    public defaultServiceCode(): ServiceCode {
        return 'externalpayment';
    }
    protected transactionRequest(payload?: IRequest) {
        return super.transactionRequest(payload).setHeaders({Channel: this.channel});
    }
    protected dataRequest(payload?: IRequest) {
        return super.dataRequest(payload).setHeaders({Channel: this.channel})
    }
    setChannel(channel: 'BACKOFFICE' | 'POINT-OF-SALE') {
        this.channel = channel;
        return this;
    }
}
