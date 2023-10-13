import PayablePaymentMethod from '../PayablePaymentMethod';

export default class NoService extends PayablePaymentMethod {
    get paymentName() {
        return 'NoService';
    }
    protected _paymentName = 'noserivce';
    protected setServiceList(): this {
        return this;
    }
}
