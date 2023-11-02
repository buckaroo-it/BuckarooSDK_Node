import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest, ServiceParameter } from '../../Models';

export default class Alipay extends PayablePaymentMethod {
    pay(payload: { useMobileView?: boolean } & IPaymentRequest) {
        const serviceParameters = new ServiceParameter().set('useMobileView', payload.useMobileView);
        return super.pay(payload, serviceParameters);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
