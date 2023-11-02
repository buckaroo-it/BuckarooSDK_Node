import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest, ServiceParameter } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Alipay extends PayablePaymentMethod {
    protected _serviceCode: ServiceCode = 'alipay';

    pay(payload: { useMobileView?: boolean } & IPaymentRequest) {
        const serviceParameters = new ServiceParameter().set('useMobileView', payload.useMobileView);
        return super.pay(payload, serviceParameters);
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }
}
