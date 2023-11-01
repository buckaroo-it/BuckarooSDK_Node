import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest';
import Pay from './Models/Pay';

export default class In3<Code extends 'In3', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    pay(payload: IPaymentRequest) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
