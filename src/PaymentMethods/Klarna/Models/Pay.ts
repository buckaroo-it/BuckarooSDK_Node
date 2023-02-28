import { IArticle, Articles } from './Article'
import { BillingRecipient,ShippingRecipient,IBillingRecipient, IShippingRecipient } from './Recipient'
import { PayPayload } from '../../../Models/Payload'

export interface IPay extends PayPayload {
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IArticle[]
}

export const Services = (data) => {
    return {
        billing : new BillingRecipient(data.billing),
        shipping : new ShippingRecipient(data.shipping || data.billing),
        articles : new Articles(data.articles)
    }
}