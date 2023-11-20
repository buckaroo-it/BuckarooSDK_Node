import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class EPS extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'eps';
    }
}
