import { CreditArticle, ICreditArticle } from './Article';
import { IRequest, ServiceParameter } from '../../../Models';

export interface IAddOrUpdateProductLines extends IRequest {
    invoiceKey: string;
    articles: ICreditArticle[];
}

export class AddOrUpdateProductLines extends ServiceParameter {
    set invoiceKey(value: string) {
        this.set('invoiceKey', value);
    }

    set articles(value: ICreditArticle[]) {
        this.set(
            'articles',
            value.map((article) => new CreditArticle(article))
        );
    }

    protected getGroups() {
        return super.getGroups({
            Articles: 'ProductLine',
        });
    }

    protected getCountable() {
        return super.getCountable(['Articles']);
    }
}
