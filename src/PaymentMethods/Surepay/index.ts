import { PaymentMethod } from '../../Services';
import { IVerify, Verify } from './Models/Verify';
import { ServiceCode } from '../../Utils';

export default class Surepay extends PaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'surepay';
    }

    verify(payload: IVerify) {
        this.setServiceList('Verify', new Verify(payload));
        return super.dataRequest(payload);
    }
}
