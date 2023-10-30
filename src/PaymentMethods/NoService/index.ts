import PayablePaymentMethod from '../../Services/PayablePaymentMethod';

export default class NoService<Code extends 'noservice', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'noserivce';

    get paymentName() {
        return 'NoService';
    }

    protected setServiceList(): this {
        return this;
    }
}
