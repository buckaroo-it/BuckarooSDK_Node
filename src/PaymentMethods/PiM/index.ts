import { PaymentMethod } from '../../Services';
import { Generate, IGenerate } from './Models/Generate';
import { ServiceCode } from '../../Utils';

export default class PiM extends PaymentMethod {
    protected _serviceCode: ServiceCode = 'pim';
    protected _requiredFields = ['currency'];

    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
