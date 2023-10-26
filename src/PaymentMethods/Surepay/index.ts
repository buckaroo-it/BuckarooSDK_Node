import PaymentMethod from '../../Services/PaymentMethod';
import { IVerify, Verify } from './Models/Verify';

export default class Surepay extends PaymentMethod {
    protected _paymentName = 'Surepay';

    verify(payload: IVerify) {
        this.setServiceList('Verify', new Verify(payload));
        return super.dataRequest(payload);
    }
}
