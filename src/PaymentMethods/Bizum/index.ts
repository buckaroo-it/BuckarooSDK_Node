import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class Bizum extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'bizum';
    }
}
