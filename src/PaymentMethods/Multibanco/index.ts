import PayablePaymentMethod from '../../Services/PayablePaymentMethod';

export default class MultiBanco<
    Code extends 'multibanco',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
}
