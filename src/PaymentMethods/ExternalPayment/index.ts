import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';
import { IRequest } from '../../Models';

export type ExternalPaymentChannels = 'BACKOFFICE' | 'POINT-OF-SALE';

export default class ExternalPayment extends PayablePaymentMethod {
    private channel: ExternalPaymentChannels = 'BACKOFFICE';

    public defaultServiceCode(): ServiceCode {
        return 'externalpayment';
    }

    public setChannel(channel: 'BACKOFFICE' | 'POINT-OF-SALE') {
        this.channel = channel;
        return this;
    }

    protected transactionRequest(payload?: IRequest) {
        return super.transactionRequest(payload).setHeaders({ Channel: this.channel });
    }

    protected dataRequest(payload?: IRequest) {
        return super.dataRequest(payload).setHeaders({ Channel: this.channel });
    }
}
