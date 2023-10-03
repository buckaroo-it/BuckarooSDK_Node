import PayablePaymentMethod from '../PayablePaymentMethod'
import { IPaymentRequest } from '../../Models/IRequest'
import Pay from './Models/Pay'
import { IRefund, Refund } from './Models/Refund'

export default class In3 extends PayablePaymentMethod {
    protected _paymentName = 'In3'
    pay(payload: IPaymentRequest) {
        return super.pay(payload, new Pay(payload))
    }
    refund(payload: IRefund) {
        return super.refund(payload, new Refund(payload))
    }
}
