import { Generate } from './Models/Generate'
import PaymentMethod from '../PaymentMethod'

class IdealQr extends PaymentMethod {
    protected _paymentName = 'IdealQr'
    generate(payload: Generate) {
        this.action = 'generate'

        return this.dataRequest(payload)
    }
}

let _idealQr: IdealQr
const idealQr: () => IdealQr = () => {
    if (!_idealQr) _idealQr = new IdealQr()
    return _idealQr
}
export default idealQr
export { IdealQr as IdealQrClass }
