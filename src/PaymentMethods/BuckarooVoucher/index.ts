import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';
import IRequest from '../../Models/IRequest';
import { Create, ICreate } from './Models/Create';

export default class BuckarooVoucher<
    Code extends 'buckaroovoucher',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {

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
