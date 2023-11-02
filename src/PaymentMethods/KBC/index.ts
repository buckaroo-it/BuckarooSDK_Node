import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class KBC extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'KBCPaymentButton';

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
