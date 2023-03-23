import PaymentMethod from '../PaymentMethod'
import { IVerify, Verify } from './Models/Verify'

class Surepay extends PaymentMethod {
    protected _paymentName = 'surepay'
    _requiredFields = []

    verify(payload: IVerify) {
        this.action = 'verify'
        this.servicesStrategy = Verify
        this.setRequest(payload)
        return this.dataRequest()
    }
}

let _surepay: Surepay
const surepay: () => Surepay = () => {
    if (!_surepay) _surepay = new Surepay()
    return _surepay
}
export default surepay
