import { IPay } from './Models/Pay'
import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IConfig } from '../../Utils/Types'
import { ServiceParameters } from '../../Utils/ServiceParameter'

class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    protected requiredFields: Array<keyof IConfig> = [
        'currency',
        'returnURL',
        'returnURLCancel',
        'pushURL'
    ]
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
            const issuerList: { id: any; name: any }[] = []
            response = new ServiceParameters(response)
            let parameters = response.findParameter('listItemDescriptions')
            if (parameters) {
                let issuer: any
                for (issuer of Object.values(parameters)) {
                    issuerList.push({
                        id: issuer.value,
                        name: issuer.description
                    })
                }
            }
            return issuerList
        })
    }
}
let _ideal: Ideal
const ideal: () => Ideal = () => {
    if (!_ideal) _ideal = new Ideal()
    return _ideal
}
export default ideal
