import { Generate, IGenerate } from './Models/IGenerate';
import { PaymentMethod } from '../../Services';
import { ServiceCode } from '../../Utils';

export default class IdealQR extends PaymentMethod {
    protected _serviceCode: ServiceCode = 'idealqr';

    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
