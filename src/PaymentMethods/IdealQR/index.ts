import { Generate, IGenerate } from './Models/IGenerate';
import PaymentMethod from '../../Services/PaymentMethod';

export default class IdealQR<Code extends 'idealqr', Manually extends boolean = false> extends PaymentMethod<
    Code,
    Manually
> {
    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
