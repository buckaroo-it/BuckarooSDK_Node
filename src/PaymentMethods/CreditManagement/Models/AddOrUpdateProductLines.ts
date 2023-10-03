import { CreditArticle, ICreditArticle } from './Article'
import IRequest from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface IAddOrUpdateProductLines extends IRequest {
    invoiceKey: string
    articles: ICreditArticle[]
}
export class AddOrUpdateProductLines extends ServiceParameter {
    protected getGroups() {
        return super.getGroups({
            Articles: 'ProductLine'
        })
    }
    protected getCountable() {
        return super.getCountable(['Articles'])
    }
    set invoiceKey(value: string) {
        this.set('invoiceKey', value)
    }
    set articles(value: ICreditArticle[]) {
        this.set(
            'articles',
            value.map((article) => new CreditArticle(article))
        )
    }
}
