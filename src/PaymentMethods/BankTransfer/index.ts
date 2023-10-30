import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IPay, Pay } from './Models/Pay';
import { IRefundRequest } from '../../Models/IRequest';

export default class BankTransfer<
    Code extends 'transfer',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    protected _paymentName = 'BankTransfer';

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
