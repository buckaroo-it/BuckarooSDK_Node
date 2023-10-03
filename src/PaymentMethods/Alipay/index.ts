import PayablePaymentMethod from '../PayablePaymentMethod'
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest'
import { Parameter } from '../../Models/IParameters'

export default class Alipay extends PayablePaymentMethod {
    protected _paymentName = 'Alipay'

    pay(payload: { useMobileView: boolean } & IPaymentRequest) {
        return super.pay(payload, [
            new Parameter({ name: 'useMobileView', value: payload.useMobileView })
        ])
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
