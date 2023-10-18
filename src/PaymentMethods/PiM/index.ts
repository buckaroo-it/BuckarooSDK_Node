import PaymentMethod from '../../Services/PaymentMethod';

export default class PiM extends PaymentMethod {
    protected _paymentName = 'PiM';
    protected _requiredFields = ['currency'];

    generate() {
        this.setServiceList('Generate');
        return this.dataRequest();
    }
}
