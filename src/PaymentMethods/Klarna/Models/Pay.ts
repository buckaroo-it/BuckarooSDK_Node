import { KlarnaRecipient } from './Recipient'
import IArticle, { Article } from '../../../Models/Interfaces/IArticle'
import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'
import { KlarnaArticle } from './Article'
import { ICustomer } from '../../../Models/Interfaces/ICustomer'

export interface IPay extends IPaymentRequest {
    billing: ICustomer
    shipping?: ICustomer
    articles: Partial<IArticle>[]
}
export class Pay extends ServiceParameter {
    protected getGroups() {
        return super.getGroups({
            Billing: 'BillingCustomer',
            Shipping: 'ShippingCustomer',
            Articles: 'Article'
        })
    }
    protected getCountable() {
        return super.getCountable(['Articles'])
    }
    set billing(billing: ICustomer) {
        this.set('billing', new KlarnaRecipient(billing))
        if (this.get('shipping') === undefined) {
            this.shipping = billing
        }
    }
    set shipping(shipping: ICustomer) {
        this.set('shipping', new KlarnaRecipient(shipping))
    }
    set articles(articles: IArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new KlarnaArticle(article))
        )
    }
}
