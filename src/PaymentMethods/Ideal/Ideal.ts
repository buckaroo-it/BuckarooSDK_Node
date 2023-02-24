import {IPay, Services} from './Models/Pay'
import client from '../../Request/Client'
import { PayablePaymentMethod } from "../PayablePaymentMethod";
import { RefundPayload } from "../../Models/Payload";
import { IConfig } from "../../Utils/Types";
class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    protected requiredFields: Array<keyof IConfig> = ['currency', 'returnURL', 'returnURLCancel', 'pushURL']
    async pay(payload?:IPay):Promise<any>{
        this.action = 'Pay'

        const services = Services(payload || this.request.getData())

        return super.pay(services,payload)
    }

    async refund(payload:RefundPayload):Promise<any>{
        this.action = 'Refund'
        return super.pay({},payload)
    }
    setPayload(payload:IPay){
        super.setPayload(payload)
    }
    async issuers(): Promise<any> {
        return await client.specification( this.paymentName, 2).then((response) => {
            const issuerList: Array<{ id: any; name: any }> = []
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

export { Ideal }
