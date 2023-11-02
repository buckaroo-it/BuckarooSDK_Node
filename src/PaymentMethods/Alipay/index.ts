import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest, ServiceParameter } from '../../Models';

export default class Alipay<Code extends 'alipay', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    pay(payload: { useMobileView?: boolean } & IPaymentRequest) {
        const serviceParameters = new ServiceParameter().set('useMobileView', payload.useMobileView);
        return super.pay(payload, serviceParameters);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
