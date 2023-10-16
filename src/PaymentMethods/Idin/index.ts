import PaymentMethod from '../PaymentMethod';
import { IPay } from '../Ideal/Models/Pay';

export default class Idin extends PaymentMethod {
    protected _paymentName = 'Idin';

    identify(payload: IPay) {
        return this.dataRequest(payload);
    }

    verify(payload: IPay) {
        return this.dataRequest(payload);
    }

    login(payload: IPay) {
        return this.dataRequest(payload);
    }
}
