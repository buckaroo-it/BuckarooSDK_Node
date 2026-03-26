import { PayablePaymentMethod } from '../../Services';
import { IPaymentOrder, PaymentOrder } from './Models/PaymentOrder';
import { IInstantPaymentOrder, InstantPaymentOrder } from './Models/InstantPaymentOrder';
import { ServiceCode } from '../../Utils';

export default class Banking extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'banking';
    }

    paymentOrder(payload: IPaymentOrder) {
        this.setPayPayload(payload);
        this.setServiceList('PaymentOrder', new PaymentOrder(payload));
        return this.transactionRequest();
    }

    instantPaymentOrder(payload: IInstantPaymentOrder) {
        this.setPayPayload(payload);
        this.setServiceList('InstantPaymentOrder', new InstantPaymentOrder(payload));
        return this.transactionRequest();
    }
}