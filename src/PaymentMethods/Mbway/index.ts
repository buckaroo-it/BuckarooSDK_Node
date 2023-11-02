import { PayablePaymentMethod } from '../../Services';

export default class Mbway<Code extends 'MBWay', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {}
