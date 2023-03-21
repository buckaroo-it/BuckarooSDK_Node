import { IKlarnaArticle } from './Article'
import { IBillingRecipient, IShippingRecipient } from './Recipient'
import { Payload } from '../../../Models/ITransaction'
import { Pay as AfterPayPay } from '../../Afterpay/Model/Services'

export interface IPay extends Payload {
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IKlarnaArticle[]
}

export const Pay = (data) => {
    return AfterPayPay(data)
}
