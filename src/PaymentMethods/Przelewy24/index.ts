import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, Pay } from './Models/Pay'

class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName = 'Przelewy24'

    pay(payload: IPay) {
        this.servicesStrategy = Pay
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
}

let _przelewy24: Przelewy24
const przelewy24: () => Przelewy24 = () => {
    if (!_przelewy24) _przelewy24 = new Przelewy24()
    return _przelewy24
}
export default przelewy24
