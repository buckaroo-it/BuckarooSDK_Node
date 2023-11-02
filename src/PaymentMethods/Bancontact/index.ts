import { PayablePaymentMethod } from '../../Services';
import { IPay, IPayComplete, IPayEncrypted, IPayOneClick, Pay } from './Models/Pay';
import { IRefundRequest } from '../../Models';

export default class Bancontact extends PayablePaymentMethod {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    authenticate(payload: IPay) {
        this.setServiceList('Authenticate', new Pay(payload));
        return this.transactionRequest(payload);
    }

    payOneClick(payload: IPayOneClick) {
        this.setServiceList('PayOneClick', new Pay(payload));
        return this.transactionRequest(payload);
    }

    payEncrypted(payload: IPayEncrypted) {
        this.setServiceList('PayEncrypted', new Pay(payload));
        return this.transactionRequest(payload);
    }

    completePayment(payload: IPayComplete) {
        this.setServiceList('CompletePayment', new Pay(payload));
        return this.dataRequest(payload);
    }

    payRecurring(payload: IPayOneClick) {
        this.setServiceList('PayRecurring', new Pay(payload));
        return this.transactionRequest(payload);
    }
}
