import PayablePaymentMethod from '../PayablePaymentMethod'
import { IRefundRequest } from '../../Models/IRequest'
import { IPay } from './Models/Pay'

export default class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'Tinka'
    pay(payload: IPay) {
        if (payload.billingCustomer) {
            // @ts-ignore
            payload.shippingCustomer = payload.shippingCustomer || payload.billingCustomer
        }
        return super.pay(payload)
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
