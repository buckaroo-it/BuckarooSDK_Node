import { IKlarnaArticle } from './Article'
import { IBilling, IShipping } from './Recipient'
import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    billingCustomer: IBilling
    shippingCustomer?: IShipping
    articles: { article: IKlarnaArticle }[]
}
