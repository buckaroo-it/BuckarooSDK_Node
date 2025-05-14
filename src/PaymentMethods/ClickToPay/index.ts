import { PayablePaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class ClickToPay extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'ClickToPay';
    }
}
