import PaymentMethod from '../PaymentMethod'
import { IVerify, surepayModelStrategy } from './Models/Verify'

class Surepay extends PaymentMethod {
    protected _paymentName = 'surepay'
    _requiredFields = []
    modelStrategy = new surepayModelStrategy({})
    verify(payload: IVerify) {
        this.action = 'verify'
        return this.dataRequest(payload)
    }
}

let _surepay: Surepay
const surepay: () => Surepay = () => {
    if (!_surepay) _surepay = new Surepay()
    return _surepay
}
export default surepay
export { Surepay as SurepayClass }
