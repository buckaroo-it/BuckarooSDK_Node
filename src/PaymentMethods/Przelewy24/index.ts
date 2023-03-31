import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IPay, Przelewy24ModelStrategy } from './Models/Pay'

class Przelewy24 extends PayablePaymentMethod {
    protected _paymentName = 'Przelewy24'

    modelStrategy = new Przelewy24ModelStrategy({})
    pay(payload: IPay) {
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
export { Przelewy24 as Przelewy24Class }
