import { IPay, Pay } from './Models/Pay';
import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Klarna extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'klarna';
    }

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
