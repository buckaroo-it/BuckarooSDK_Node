
import PaymentMethod from "../PaymentMethod";

class Idin extends PaymentMethod {
    protected _paymentName = 'Idin'
    identify(payload) {
        return this.dataRequest()
    }
    verify(payload) {
        return this.dataRequest()
    }
    login(payload){
        return this.dataRequest()
    }
}

let _payment: Idin
const idin: () => Idin = () => {
    if (!_payment) _payment = new Idin()
    return _payment
}
export default idin
