import PaymentMethod from '../../Services/PaymentMethod';
import IRequest from '../../Models/IRequest';

type key = Required<Pick<IRequest, 'originalTransactionKey'>>;
export default class Thunes extends PaymentMethod {
    protected _paymentName = 'Thunes';

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
