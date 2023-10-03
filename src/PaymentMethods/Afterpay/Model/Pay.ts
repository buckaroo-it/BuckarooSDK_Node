import { AfterPayArticle, IAfterPayArticle } from './Article'
import Customer from './Customer'
import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

import { ICustomer } from '../../../Models/Interfaces/ICustomer'

export interface IPay extends IPaymentRequest {
    clientIP: string
    billing: ICustomer
    shipping?: ICustomer
    articles: IAfterPayArticle[]
    bankAccount?: string
    bankCode?: string
    merchantImageUrl?: string
    summaryImageUrl?: string
    yourReference?: string
    ourReference?: string
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
    set shipping(shipping: ICustomer) {
        this.set('shipping', new Customer(shipping))
    }
    set billing(billing: ICustomer) {
        this.set('billing', new Customer(billing))
        if (this.get('shipping') === undefined) {
            this.shipping = billing
        }
    }
    set articles(articles: IAfterPayArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new AfterPayArticle(article))
        )
    }
    set bankAccount(bankAccount: string) {
        this.set('bankAccount', bankAccount)
    }
    set bankCode(bankCode: string) {
        this.set('bankCode', bankCode)
    }
    set merchantImageUrl(merchantImageUrl: string) {
        this.set('merchantImageUrl', merchantImageUrl)
    }
    set summaryImageUrl(summaryImageUrl: string) {
        this.set('summaryImageUrl', summaryImageUrl)
    }
    set ourReference(ourReference: string) {
        this.set('ourReference', ourReference)
    }
}
