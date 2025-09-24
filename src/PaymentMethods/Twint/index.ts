import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Twint extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'twint';
    }
}
