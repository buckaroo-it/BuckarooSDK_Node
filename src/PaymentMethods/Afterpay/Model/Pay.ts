import { IAfterPayArticle } from './Article'
import { Payload } from '../../../Models/ITransaction'
import { AfterPayCustomer } from './Customer'
import { IPAddress } from '../../../Utils/Types'
export interface IPay extends Payload {
    clientIP: string | IPAddress
    billingCustomer: AfterPayCustomer
    shippingCustomer?: AfterPayCustomer
    articles: { article: IAfterPayArticle }[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
}
