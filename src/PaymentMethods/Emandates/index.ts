import { PaymentMethod } from '../../Services';
import { IConfig, ServiceCode } from '../../Utils';
import { IMandate, Mandate } from './Models/Mandate';

export default class Emandates extends PaymentMethod {
    _requiredFields: Array<keyof IConfig> = ['currency'];

    public defaultServiceCode(): ServiceCode {
        return 'emandate';
    }

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
