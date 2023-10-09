import PayablePaymentMethod from '../PayablePaymentMethod'
import { IPaymentRequest, IRefundRequest } from '../../Models/IRequest'
import {ServiceParameter} from "../../Models/ServiceParameters";

export default class Alipay extends PayablePaymentMethod {
    protected _paymentName = 'Alipay'

    pay(payload: { useMobileView?: boolean } & IPaymentRequest) {
        const serviceParameters = new ServiceParameter()
                        .set('useMobileView', payload.useMobileView)
        return super.pay(payload, serviceParameters)
    }
    refund(payload: IRefundRequest) {
        return super.refund(payload)
    }
}
