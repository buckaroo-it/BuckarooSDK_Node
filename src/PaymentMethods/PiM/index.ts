import PaymentMethod from '../../Services/PaymentMethod';
import { Generate, IGenerate } from './Models/Generate';

export default class PiM extends PaymentMethod {
    protected _paymentName = 'pim';
    protected _requiredFields = ['currency'];

    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
