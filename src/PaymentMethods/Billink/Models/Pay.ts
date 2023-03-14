import {Payload} from "../../../Models/ITransaction";
import {IBillingRecipient, recipient} from "../../Afterpay/Model/Recipient";
import {articles,IBillinkArticle} from "./Article";

export interface IPay extends Payload {
    billing: IBillingRecipient
    shipping?: Omit<IBillingRecipient, 'phone'> & Partial<Pick<IBillingRecipient, 'phone'>>
    articles: IBillinkArticle[]
    trackandtrace?: string
    vATNumber?:string
    summaryImageUrl?: string
    bankAccount?: string
    bankCode?: string
    yourReference?: string
    ourReference?: string
}

export const payServices = (data) => {
    data.billing = recipient(data.billing)
    data.shipping = recipient(data.shipping || data.billing)

    data.articles = articles(data.articles)

    data.billing.groupType = 'BillingCustomer'
    data.shipping.groupType = 'ShippingCustomer'

    return data
}
