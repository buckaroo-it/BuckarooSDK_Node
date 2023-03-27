import { IPay } from './Models/Pay'
import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    pay(payload?: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    setPayload(payload: IPay) {
        super.setPayload(payload)
    }
    issuers() {
        return this.specification().then((response) => {
            if(response.Actions.length && response.Actions[0].RequestParameters.length) {
                return response.Actions[0].RequestParameters[0].ListItemDescriptions.map((item) => {
                    return {
                        id: item.Value,
                        name: item.Description
                    }
                })
            }
            return []
        })
    }
}
let _ideal: Ideal
const ideal: () => Ideal = () => {
    if (!_ideal) _ideal = new Ideal()
    return _ideal
}
export default ideal
