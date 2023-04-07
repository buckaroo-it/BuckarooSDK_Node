import { Generate } from './Models/Generate'
import PaymentMethod from '../PaymentMethod'

export default class IdealQr extends PaymentMethod {
    protected _paymentName = 'IdealQr'
    generate(payload: Generate) {
        this.action = 'generate'

        return this.dataRequest(payload)
    }
}
