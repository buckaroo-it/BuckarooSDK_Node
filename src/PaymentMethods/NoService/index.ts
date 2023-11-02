import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class NoService extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'noservice';

    protected setServiceList(): this {
        return this;
    }
}
