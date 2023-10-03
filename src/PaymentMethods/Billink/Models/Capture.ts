import { ServiceParameter } from '../../../Models/ServiceParameters'
import { Article, IBillinkArticle } from './Article'
import { IPaymentRequest } from '../../../Models/IRequest'

export interface ICapture extends IPaymentRequest {
    articles?: IBillinkArticle[]
}
export class Capture extends ServiceParameter {
    protected getGroups() {
        return super.getGroups({
            Articles: 'Article'
        })
    }
    set articles(articels: IBillinkArticle[]) {
        this.set(
            'articles',
            articels.map((article) => new Article(article))
        )
    }
}
