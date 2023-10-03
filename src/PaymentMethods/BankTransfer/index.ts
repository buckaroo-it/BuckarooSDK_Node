import PayablePaymentMethod from '../PayablePaymentMethod'
import { IPay, Pay } from './Models/Pay'
import { IRefundRequest } from '../../Models/IRequest'

export default class BankTransfer extends PayablePaymentMethod {
    protected _paymentName = 'BankTransfer'

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload))
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
