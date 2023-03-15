import {articles, IAfterPayArticle} from './Article'
import {IBillingRecipient, recipient} from './Recipient'
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

export const afterPayServices = (data) => {
    if(data.billing){
        data.billing = recipient(data.billing)
        data.shipping = recipient(data.shipping || {...data.billing})
        data.billing.groupType = 'BillingCustomer'
        data.shipping.groupType = 'ShippingCustomer'
    }
    if (data.articles){
        data.articles = articles(data.articles)
    }
    return data
}
