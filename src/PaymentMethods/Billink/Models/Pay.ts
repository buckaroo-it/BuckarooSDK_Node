import { Payload } from '../../../Models/ITransaction'
import { IBillinkArticle } from './Article'
import { Customer } from './Customer'

export interface IPay extends Payload {
    billingCustomer: Customer
    shippingCustomer?: Customer
    articles: { article: IBillinkArticle }[]
    trackandtrace?: string
    VATNumber?: string
    summaryImageUrl?: string
}
