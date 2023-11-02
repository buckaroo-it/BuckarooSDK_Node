import { PayablePaymentMethod } from '../../Services';

export default class NoService<Code extends 'noservice', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected setServiceList(): this {
        return this;
    }
}
