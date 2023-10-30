import { Generate, IGenerate } from './Models/IGenerate';
import PaymentMethod from '../../Services/PaymentMethod';

export default class IdealQR extends PaymentMethod {
    protected _paymentName = 'IdealQR';

    generate(payload: IGenerate) {
        this.setServiceList('Generate', new Generate(payload));
        return this.dataRequest();
    }
}
