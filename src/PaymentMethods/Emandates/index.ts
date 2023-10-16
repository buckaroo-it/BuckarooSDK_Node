import PaymentMethod from '../PaymentMethod';
import { IConfig } from '../../Utils/Types';
import { IMandate, Mandate } from './Models/Mandate';

export default class Emandates extends PaymentMethod {
    _requiredFields: Array<keyof IConfig> = ['currency'];
    protected _paymentName = 'Emandates';

    issuerList() {
        this.setServiceList('GetIssuerList');
        return this.dataRequest();
    }

    createMandate(payload: IMandate) {
        this.setServiceList('CreateMandate', new Mandate(payload));
        return this.dataRequest(payload);
    }

    status(payload: IMandate) {
        this.setServiceList('GetStatus', new Mandate(payload));
        return this.dataRequest(payload);
    }

    modifyMandate(payload: IMandate) {
        this.setServiceList('ModifyMandate', new Mandate(payload));
        return this.dataRequest(payload);
    }

    cancelMandate(payload: IMandate) {
        this.setServiceList('CancelMandate', new Mandate(payload));
        return this.dataRequest(payload);
    }
}
