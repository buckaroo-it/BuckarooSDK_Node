import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Pointofsale extends PayablePaymentMethod {
    protected _paymentName = 'pospayment'
}

let _pointofsale: Pointofsale
const pointofsale: () => Pointofsale = () => {
    if (!_pointofsale) _pointofsale = new Pointofsale()
    return _pointofsale
}
export default pointofsale
export { Pointofsale as PointofsaleClass }
