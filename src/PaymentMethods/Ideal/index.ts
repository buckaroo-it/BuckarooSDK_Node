import { IPay } from './Models/Pay'
import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    combinable = true
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    issuers() {
        return this.specification().then((response) => {
            return response
                .getActionRequestParameters('Pay')
                ?.find((item) => item.Name === 'issuer')
                ?.ListItemDescriptions.map((item) => {
                    return {
                        id: item.Value,
                        name: item.Description
                    }
                })
        })
    }
}
let _ideal: Ideal
const ideal: () => Ideal = () => {
    if (!_ideal) _ideal = new Ideal()
    return _ideal
}
export default ideal
export { Ideal as IdealClass }
