import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';

export default class PointOfSale extends PayablePaymentMethod {
    protected _paymentName = 'PointOfSale';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
