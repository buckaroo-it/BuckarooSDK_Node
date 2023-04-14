import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { AfterPayCustomer } from './Customer'
export interface IPay extends Payload {
    clientIP: string
    billingCustomer: AfterPayCustomer
    shippingCustomer?: AfterPayCustomer
    article: IAfterPayArticle[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
}
