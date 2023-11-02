import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class In3Old extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'capayable';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    payInInstallments(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('PayInInstallments', new Pay(payload));
        return super.transactionRequest();
    }
}
