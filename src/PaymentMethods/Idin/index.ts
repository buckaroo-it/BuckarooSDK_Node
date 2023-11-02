import { PaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';

export default class Idin<Code extends 'idin', Manually extends boolean = false> extends PaymentMethod<Code, Manually> {
    identify(payload: IPay) {
        this.setServiceList('Identify', new Pay(payload));
        return this.dataRequest(payload);
    }

    verify(payload: IPay) {
        this.setServiceList('Verify', new Pay(payload));
        return this.dataRequest(payload);
    }

    login(payload: IPay) {
        this.setServiceList('Login', new Pay(payload));
        return this.dataRequest(payload);
    }
}
