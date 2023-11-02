import { PayablePaymentMethod } from '../../Services';
import IPay, { Pay } from './Models/Pay';
import { IRefund, Refund } from './Models/Refund';

export default class GiftCard extends PayablePaymentMethod {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload));
    }
}
