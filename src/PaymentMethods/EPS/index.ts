import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class EPS extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'eps';
}
