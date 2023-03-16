import { AfterPayArticle, IAfterPayArticle } from './Article'
import { IBillingRecipient, IShippingRecipient, adaptShipping, adaptBilling } from './Recipient'
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IPay extends Payload {
    clientIP: IPAddress | string
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IAfterPayArticle[]
    merchantImageUrl?: string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    yourReference?: string
    ourReference?: string
}

export const Pay = (data) => {
    data = new ServiceParameters(data)
    if (data.billing) data.billing = adaptBilling(data.billing)
    if (data.shipping) data.shipping = adaptShipping(data.shipping || data.billing)
    if (data.articles) data.articles = AfterPayArticle(data.articles)
    return data
}
