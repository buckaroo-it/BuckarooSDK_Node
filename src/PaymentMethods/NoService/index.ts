import { PayablePaymentMethod } from '../../Services';

export default class NoService extends PayablePaymentMethod {
    protected setServiceList(): this {
        return this;
    }
}
