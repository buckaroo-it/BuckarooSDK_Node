import { Payload } from '../../../Models/ITransaction'
import { IBillingRecipient, adaptBilling, adaptShipping } from '../../Afterpay/Model/Recipient'
import { IBillinkArticle } from './Article'
import { ArticleService } from '../../../Models/Services/IArticle'
import { ServiceParameters } from '../../../Utils/ServiceParameter'

export interface IPay extends Payload {
    billing: IBillingRecipient
    shipping?: Omit<IBillingRecipient, 'phone'> & Partial<Pick<IBillingRecipient, 'phone'>>
    articles: IBillinkArticle[]
    trackandtrace?: string
    vATNumber?: string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    yourReference?: string
    ourReference?: string
}

export const payServices = (data) => {
    data = new ServiceParameters(data)
    if (data.billing) data.billing = adaptBilling(data.billing)
    if (data.shipping) data.shipping = adaptShipping(data.shipping || data.billing)
    if (data.articles) data.articles = ArticleService(data.articles)

    return data
}
