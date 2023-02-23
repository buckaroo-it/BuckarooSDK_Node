import { IArticle, Articles } from './Article'
import { BillingRecipient,ShippingRecipient,IBillingRecipient, IShippingRecipient } from './Recipient'
import { PayPayload} from '../../../Models/Payload'

export interface IPay extends PayPayload {
    billing: IBillingRecipient
    shipping?: IShippingRecipient
    articles: IArticle[]
}
export default class Pay {
    billing: BillingRecipient
    shipping?: ShippingRecipient
    articles: Articles

    constructor(data:IPay) {
        this.billing = new BillingRecipient(data.billing)
        this.shipping = new ShippingRecipient(data.shipping || data.billing)
        this.articles = new Articles(data.articles)
    }
}
