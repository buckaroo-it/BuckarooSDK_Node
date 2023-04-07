import PaymentMethod from '../PaymentMethod'
import { IVerify } from './Models/Verify'

export default class Surepay extends PaymentMethod {
    protected _paymentName = 'surepay'
    _requiredFields = []
    verify(payload: IVerify) {
        this.action = 'verify'
        return this.dataRequest(payload)
    }
}
