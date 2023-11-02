import { IPay, Pay } from './Models/Pay';
import { PayablePaymentMethod } from '../../Services';

export default class Klarna extends PayablePaymentMethod {
    pay(data: IPay) {
        return super.pay(data, new Pay(data));
    }

    payInInstallments(data: IPay) {
        this.setPayPayload(data);
        this.setServiceList('PayInInstallments', new Pay(data));
        return super.transactionRequest();
    }

    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }
}
