import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';

export default class Giropay extends PayablePaymentMethod {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
