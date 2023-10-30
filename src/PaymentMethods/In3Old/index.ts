import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';

export default class In3Old<Code extends 'capayable', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'In3Old';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    payInInstallments(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('PayInInstallments', new Pay(payload));
        return super.transactionRequest();
    }
}
