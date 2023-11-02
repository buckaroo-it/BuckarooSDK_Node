import { PayablePaymentMethod } from '../../Services';

export default class MultiBanco<
    Code extends 'multibanco',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {}
