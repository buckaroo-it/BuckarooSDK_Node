import { PaymentMethod } from '../../Services';
import { IInvitation, Invitation } from './Models/Invitation';

export default class PayPerEmail extends PaymentMethod {
    paymentInvitation(payload: IInvitation) {
        this.setServiceList('paymentInvitation', new Invitation(payload));
        return super.transactionRequest(payload);
    }
}
