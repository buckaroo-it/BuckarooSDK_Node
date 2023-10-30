import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';

export default class Giropay extends PayablePaymentMethod {
    protected _paymentName = 'Giropay';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
