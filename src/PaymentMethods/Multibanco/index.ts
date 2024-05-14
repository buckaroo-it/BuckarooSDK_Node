import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class MultiBanco extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'multibanco';
    }
}
