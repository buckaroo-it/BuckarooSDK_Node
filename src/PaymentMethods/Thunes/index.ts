import { PaymentMethod } from '../../Services';
import { IRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

type key = Required<Pick<IRequest, 'originalTransactionKey'>>;

export default class Thunes extends PaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'thunes';
    }

    getStatus(payload: key) {
        this.setServiceList('getStatus');
        return this.dataRequest(payload);
    }

    capture(payload: IRequest & key) {
        this.setServiceList('Capture');
        return this.transactionRequest(payload);
    }

    authorize(payload: IRequest) {
        this.setServiceList('Authorize');
        return this.dataRequest(payload);
    }

    cancel(payload: key) {
        this.setServiceList('Cancel');
        return this.dataRequest(payload);
    }
}
