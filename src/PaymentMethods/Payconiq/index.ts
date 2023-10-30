import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';

export default class Payconiq extends PayablePaymentMethod {
    protected _paymentName = 'Payconiq';

    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
