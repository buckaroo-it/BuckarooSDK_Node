import { Article, IBillinkArticle } from './Article';
import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface ICapture extends IPaymentRequest {
    articles?: IBillinkArticle[];
}

export class Capture extends ServiceParameter {
    set articles(articels: IBillinkArticle[]) {
        this.set(
            'articles',
            articels.map((article) => new Article(article))
        );
    }

    protected getGroups() {
        return super.getGroups({
            Articles: 'Article',
        });
    }
}
