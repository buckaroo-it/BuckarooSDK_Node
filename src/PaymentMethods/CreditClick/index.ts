import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IRefund, Refund } from './Models/Refund';
import { ServiceCode } from '../../Utils';

export default class CreditClick extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'creditclick';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload));
    }
}
