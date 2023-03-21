import PaymentMethod from '../PaymentMethod'

class Surepay extends PaymentMethod {
    protected _paymentName = 'surepay'

    verify() {
        this.action = 'verify'
        return this.dataRequest()
    }
}

let _surepay: Surepay
const surepay: () => Surepay = () => {
    if (!_surepay) _surepay = new Surepay()
    return _surepay
}
export default surepay
