import { Generate } from './Models/Generate'
import PaymentMethod from '../PaymentMethod'

class IdealQr extends PaymentMethod {
    protected _paymentName = 'IdealQr'
    generate(payload: Generate) {
        this.action = 'generate'
        this.setRequest(payload)

        return this.dataRequest()
    }
}

let _idealQr: IdealQr
const idealQr: () => IdealQr = () => {
    if (!_idealQr) _idealQr = new IdealQr()
    return _idealQr
}
export default idealQr
