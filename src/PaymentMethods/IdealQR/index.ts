import { Generate, IGenerate } from './Models/IGenerate';
import { PaymentMethod } from '../../Services';

export default class IdealQR extends PaymentMethod {
    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
