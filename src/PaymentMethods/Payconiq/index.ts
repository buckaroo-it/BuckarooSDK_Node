import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Payconiq extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'payconiq';

    instantRefund(payload: IRefundRequest) {
        this.setServiceList('InstantRefund');
        return this.transactionRequest(payload);
    }
}
