import PaymentMethod from '../PaymentMethod'
import { IVerify } from './Models/Verify'
import { ServiceParameter } from '../../Models/ServiceParameters'
export default class Surepay extends PaymentMethod {
    protected _paymentName = 'Surepay'
    verify(payload: IVerify) {
        this.setServiceList(
            'Verify',
            new ServiceParameter().set('customeraccountname', payload.customeraccountname)
        )
        return this.dataRequest(payload)
    }
}
