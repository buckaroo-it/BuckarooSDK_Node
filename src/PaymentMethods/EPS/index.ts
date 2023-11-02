import { PayablePaymentMethod } from '../../Services';

export default class EPS<Code extends 'eps', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {}
