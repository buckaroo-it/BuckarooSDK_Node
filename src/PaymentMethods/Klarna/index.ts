import { IPay, Pay } from './Models/Pay';
import { PayablePaymentMethod } from '../../Services';

export default class Klarna<Code extends 'klarna', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
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
