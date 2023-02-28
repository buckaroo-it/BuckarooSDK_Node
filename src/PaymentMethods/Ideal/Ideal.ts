import {IPay, Services} from './Models/Pay'
import client from '../../Request/Client'
import { PayablePaymentMethod } from "../PayablePaymentMethod";
import { RefundPayload } from "../../Models/Payload";
import { IConfig } from "../../Utils/Types";
import {TransactionResponse} from "../../Models/TransactionResponse";
export class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    protected requiredFields: Array<keyof IConfig> = ['currency', 'returnURL', 'returnURLCancel', 'pushURL']

    setPayload(payload:IPay){
        super.setPayload(payload)
    }
    async pay(payload?:IPay):Promise<TransactionResponse>{
        this.action = 'Pay'

        const services = Services(payload || this.request.getData())

        return super.pay(services,payload)
    }

    refund(payload:RefundPayload):Promise<TransactionResponse>{
        this.action = 'Refund'
        return super.pay({},payload)
    }
    issuers() {
        return client.specification( this.paymentName, 2).then((response) => {
            const issuerList: { id: any; name: any }[] = []

            if (response.data?.Actions?.['0']?.RequestParameters?.[0]?.ListItemDescriptions) {
                const issuersData =
                    response.data.Actions['0'].RequestParameters[0].ListItemDescriptions

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
const ideal = new Ideal()

export { ideal }