import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';
import { IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class BankTransfer extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'transfer';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
