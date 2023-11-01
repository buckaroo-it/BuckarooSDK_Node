import PaymentMethod from '../../Services/PaymentMethod';
import { IConfig } from '../../Utils/Types';
import { IMandate, Mandate } from './Models/Mandate';

export default class Emandates<Code extends 'emandate', Manually extends boolean = false> extends PaymentMethod<
    Code,
    Manually
> {
    _requiredFields: Array<keyof IConfig> = ['currency'];

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
