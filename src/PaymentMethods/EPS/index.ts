import PayablePaymentMethod from '../../Services/PayablePaymentMethod';

export default class EPS<Code extends 'eps', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'EPS';
}
