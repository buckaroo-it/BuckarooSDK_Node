import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IRequest } from '../../Models';
import { Create, ICreate } from './Models/Create';
import { ServiceCode } from '../../Utils';

export default class BuckarooVoucher extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'buckaroovoucher';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    getBalance(payload: IRequest & Pick<IPay, 'voucherCode'>) {
        this.setServiceList('GetBalance', new Pay(payload));
        return this.dataRequest(payload);
    }

    create(payload: IRequest & ICreate) {
        this.setServiceList('CreateApplication', new Create(payload));
        return this.dataRequest(payload);
    }

    deactivate(payload: IRequest & Pick<IPay, 'voucherCode'>) {
        this.setServiceList('DeactivateVoucher', new Pay(payload));
        return this.dataRequest(payload);
    }
}
