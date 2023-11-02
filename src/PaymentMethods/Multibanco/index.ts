import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class MultiBanco extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'multibanco';
}
