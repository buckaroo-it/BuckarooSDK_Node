import { PayablePaymentMethod } from '../../Services';
import IPay, { Pay } from './Models/Pay';
import { IRefund, Refund } from './Models/Refund';
import { ServiceCode } from '../../Utils';

export default class GiftCard extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'giftcard';
    }

    pay(payload: IPay) {
        if(payload.name){
            this.setServiceCode(payload.name);
        }
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefund) {
        if(payload.name){
            this.setServiceCode(payload.name);
        }
        return super.refund(payload, new Refund(payload));
    }
}
