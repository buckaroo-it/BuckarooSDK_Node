import { PaymentMethod } from '../../Services';
import { IVerify, Verify } from './Models/Verify';

export default class Surepay extends PaymentMethod {
    verify(payload: IVerify) {
        this.setServiceList('Verify', new Verify(payload));
        return super.dataRequest(payload);
    }
}
