import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Swish extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'swish';
    }
}
