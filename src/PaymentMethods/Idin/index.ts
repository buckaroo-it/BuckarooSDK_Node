import { PaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class Idin extends PaymentMethod {
    protected _serviceCode: ServiceCode = 'idin';

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
