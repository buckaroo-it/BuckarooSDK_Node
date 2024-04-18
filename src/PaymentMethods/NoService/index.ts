import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class NoService extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'noservice';
    }

    protected setServiceList(): this {
        return this;
    }
}
