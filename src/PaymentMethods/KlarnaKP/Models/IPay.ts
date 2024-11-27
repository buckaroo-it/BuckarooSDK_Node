import { IArticle, IPaymentRequest, Person, ServiceParameter } from '../../../Models';
import Article, { IKlarnaKpArticle } from './Article';

export interface IPay extends IPaymentRequest {
    reservationNumber?: string;
    articles?: Partial<IKlarnaKpArticle>[];
}

export class Pay extends ServiceParameter {
    set reservationNumber(value: string) {
        this.set('reservationNumber', value);
    }

    set articles(articles: IArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new Article(article))
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

export class Customer extends Person {
    set firstName(email: string) {
        this.set('customerFirstName', email);
    }

    set lastName(email: string) {
        this.set('customerLastName', email);
    }
}
