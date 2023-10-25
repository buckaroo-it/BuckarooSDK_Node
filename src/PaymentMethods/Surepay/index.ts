import PaymentMethod from '../PaymentMethod';
import { IVerify } from './Models/Verify';
import { Parameter } from '../../Models/IParameters';

export default class Surepay extends PaymentMethod {
    protected _paymentName = 'Surepay';

    verify(payload: IVerify) {
        const serviceParameter = new Parameter({ name: 'customeraccountname', value: payload.customeraccountname });
        this.setServiceList('Verify', [serviceParameter]);
        return this.dataRequest(payload);
    }
}
