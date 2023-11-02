import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Mbway extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'MBWay';
}
