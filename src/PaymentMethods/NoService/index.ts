import PayablePaymentMethod from '../PayablePaymentMethod';

export default class NoService extends PayablePaymentMethod {
    protected _paymentName = 'noserivce';

    get paymentName() {
        return 'NoService';
    }

    protected setServiceList(): this {
        return this;
    }
}
