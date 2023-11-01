import PayablePaymentMethod from '../../Services/PayablePaymentMethod';

export default class Mbway<Code extends 'MBWay', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
}
