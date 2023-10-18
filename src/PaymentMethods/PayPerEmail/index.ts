import PaymentMethod from '../../Services/PaymentMethod';
import { IInvitation, Invitation } from './Models/Invitation';

export default class PayPerEmail extends PaymentMethod {
    protected _paymentName = 'PayPerEmail';

    paymentInvitation(payload: IInvitation) {
        this.setServiceList('paymentInvitation', new Invitation(payload));
        return super.transactionRequest(payload);
    }
}
