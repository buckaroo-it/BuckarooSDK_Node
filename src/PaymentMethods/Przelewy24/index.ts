import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import { IPay, Pay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class Przelewy24 extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'przelewy24';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
