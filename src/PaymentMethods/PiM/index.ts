import PaymentMethod from '../../Services/PaymentMethod';
import { Generate, IGenerate } from './Models/Generate';

export default class PiM<Code extends 'pim', Manually extends boolean = false> extends PaymentMethod<Code, Manually> {
    protected _requiredFields = ['currency'];

    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
