import { IPay, Services } from './Models/Pay'
import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'
import { IConfig } from '../../Utils/Types'
import { TransactionResponse } from '../../Models/TransactionResponse'
import { buckarooClient } from "../../BuckarooClient";
class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    protected requiredFields: Array<keyof IConfig> = [
        'currency',
        'returnURL',
        'returnURLCancel',
        'pushURL'
    ]
    protected services = Services
    setPayload(payload: IPay) {
        super.setPayload(payload)
    }
    pay(payload?: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload): Promise<TransactionResponse> {
        this.action = 'Refund'
        return super.pay(payload)
    }
    issuers() {
        return buckarooClient().client().specification(this.paymentName, 2).then((response) => {
            const issuerList: { id: any; name: any }[] = []
            if (response?.Actions?.['0']?.RequestParameters?.[0]?.ListItemDescriptions) {
                const issuersData = response.Actions['0'].RequestParameters[0].ListItemDescriptions

                if (issuersData.length > 0) {
                    for (const issuer of issuersData) {
                        issuerList.push({
                            id: issuer.Value,
                            name: issuer.Description
                        })
                    }
                }
            }
            return issuerList
        })
    }
}
let _ideal:Ideal
const ideal:() => Ideal = () => {
    if (!_ideal)
        _ideal = new Ideal()
    return _ideal
}
export default ideal