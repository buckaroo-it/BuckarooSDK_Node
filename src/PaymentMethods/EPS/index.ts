import PayablePaymentMethod from '../PayablePaymentMethod'
import { IRefundRequest } from '../../Models/IRequest'

export default class EPS extends PayablePaymentMethod {
    protected _paymentName = 'EPS'

    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
