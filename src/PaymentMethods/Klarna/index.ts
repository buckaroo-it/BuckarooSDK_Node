import { IPay, Pay } from './Models/Pay';
import PayablePaymentMethod from '../PayablePaymentMethod';

export default class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'Klarna';
    pay(data: IPay) {
        return super.pay(data, new Pay(data));
    }
    payInInstallments(data: IPay) {
        this.setServiceList('PayInInstallments', new Pay(data));
        return super.pay(data);
    }
    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }
}
