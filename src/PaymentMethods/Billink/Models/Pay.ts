import { Payload } from '../../../Models/ITransaction'
import { IBillinkArticle } from './Article'
import { Customer } from "./Customer";

export interface ServiceParameters {
    billingCustomer: Customer
    shippingCustomer?: Customer
    articles: { article: IBillinkArticle }[]
    trackandtrace?: string
    VATNumber?: string
    summaryImageUrl?: string
}
export type IPay = ServiceParameters & Payload
