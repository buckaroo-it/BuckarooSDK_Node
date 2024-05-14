import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IExtraInfo } from './Models/ExtraInfo';
import { IEmandate } from './Models/Emandate';
import { ServiceCode, uniqid } from '../../Utils';
import { IPaymentRequest } from '../../Models';

export default class SEPA extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'sepadirectdebit';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    authorize(payload: IPay) {
        this.setPayPayload(payload);
        this.setServiceList('Authorize', new Pay(payload));
        return this.transactionRequest();
    }

    payRecurrent(payload: Pick<IPay, 'collectDate'> & IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('PayRecurrent', new Pay(payload));
        return this.transactionRequest();
    }

    extraInfo(payload: IExtraInfo) {
        this.setPayPayload(payload);
        this.setServiceList('Pay,ExtraInfo', new Pay(payload));
        return this.transactionRequest();
    }

    payWithEmandate(payload: IEmandate) {
        payload.invoice = payload.invoice || uniqid();
        this.setPayPayload(payload);
        this.setServiceList('PayWithEmandate', new Pay(payload));
        return this.transactionRequest();
    }
}
