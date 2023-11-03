import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Mbway extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'MBWay';
    }
}
