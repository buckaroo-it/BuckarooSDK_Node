import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay } from './Models/Pay'

export default class Tinka extends PayablePaymentMethod {
    protected _paymentName = 'tinka'
    _serviceVersion = 1
    pay(payload: IPay) {
        if (payload.billingCustomer){
            // @ts-ignore
            payload.shippingCustomer = payload.shippingCustomer || payload.billingCustomer
        }
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}
