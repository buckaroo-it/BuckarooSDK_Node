import PaymentMethod from '../PaymentMethod'
import { IPay } from '../Ideal/Models/Pay'
class Idin extends PaymentMethod {
    protected _paymentName = 'Idin'
    identify(payload: IPay) {
        return this.dataRequest(payload)
    }
    verify(payload: IPay) {
        return this.dataRequest(payload)
    }
    login(payload: IPay) {
        return this.dataRequest(payload)
    }
}

let _payment: Idin
const idin: () => Idin = () => {
    if (!_payment) _payment = new Idin()
    return _payment
}
export default idin
export { Idin as IdinClass }
