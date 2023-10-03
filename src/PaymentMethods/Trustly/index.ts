import PayablePaymentMethod from '../PayablePaymentMethod'
import { IRefundRequest } from '../../Models/IRequest'
import { IPay } from './Models/Pay'

export default class Trustly extends PayablePaymentMethod {
    protected _paymentName = 'Trustly'
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
