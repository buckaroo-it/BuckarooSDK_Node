import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { ServiceCode } from '../../Utils';

export default class Giropay extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'giropay';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
