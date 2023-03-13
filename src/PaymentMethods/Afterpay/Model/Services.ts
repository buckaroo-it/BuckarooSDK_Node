import { IAfterPayArticle } from './Article'
import { IBillingRecipient } from './Recipient'
import { ClientIP, Payload } from '../../../Models/ITransaction'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IPay extends Payload {
    clientIP: ClientIP
    billing: IBillingRecipient
    shipping?: Omit<IBillingRecipient, 'phone'> & Partial<Pick<IBillingRecipient, 'phone'>>
    articles: IAfterPayArticle[]
    merchantImageUrl?: string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    yourReference?: string
    ourReference?: string
}

export const afterPayServices = (data: IPay) => {
    let serviceData = new ServiceParameters(data)

    if (!serviceData.shipping){
        serviceData.addParameter({
            shipping:data.billing
        })
    }
    serviceData.setGroupType('BillingCostumer','billing')

    serviceData.setGroupType('ShippingCustomer','shipping')

    serviceData.setGroupType('Article','articles')
    serviceData.find('articles')?.makeCountable()
    serviceData.setKeys({
        price: 'grossUnitPrice'
    })

    return serviceData
}
