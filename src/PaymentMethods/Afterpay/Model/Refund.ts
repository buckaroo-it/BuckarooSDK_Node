import { IRefundRequest } from '../../../Models/IRequest';
import { AfterPayArticle, IAfterPayArticle } from './Article';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IRefund extends IRefundRequest {
    articles?: IAfterPayArticle[];
}

export class Refund extends ServiceParameter {
    set articles(articles: IAfterPayArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new AfterPayArticle(article))
        );
    }

    protected getGroups() {
        return super.getGroups({
            Articles: 'Article',
        });
    }

    protected getCountable() {
        return super.getCountable(['Articles']);
    }
}
