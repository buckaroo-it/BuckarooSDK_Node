import PaymentMethod from '../PaymentMethod'
import Pay, { IPay } from './Models/Pay'
import client from '../../Request/Client'
import { IRefund } from '../../Models/IRefund'

class Ideal extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'ideal',
            serviceVersion:2,
            requiredFields: ['currency', 'returnURL', 'returnURLCancel', 'pushURL']
        })
    }
    async issuers(): Promise<any> {
        return await client.specification({}, this.paymentName, 2).then((response) => {
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
                response.data = issuersData
            }
            return response
        })
    }
}

const ideal = new Ideal()
const pay = (data: IPay) => ideal.pay(data, new Pay(data))
const refund = (data: IRefund) => ideal.pay(data, {}, 'Refund')
const payRemainder = (data: IPay) => ideal.pay(data, new Pay(data), 'PayRemainder')
const issuers = () => ideal.issuers()

export { pay, issuers, payRemainder, refund }
