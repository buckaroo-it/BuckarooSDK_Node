import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { IPAddress } from '../../../Utils/Types'
import { AfterPayCustomer } from './Customer'
export interface ServiceParameters {
    billingCustomer:AfterPayCustomer
    shippingCustomer?: AfterPayCustomer
    articles: { article:IAfterPayArticle }[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
}
export type IPay = Payload & ServiceParameters & { clientIP: IPAddress | string}
