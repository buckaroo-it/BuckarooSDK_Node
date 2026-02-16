import { IArticle, IPaymentRequest, Person, ServiceParameter } from '../../../Models';
import Article, { IKlarnaArticle } from './Article';
import { IShippingInfo, ShippingInfo } from './ShippingInfo';

export interface IPay extends IPaymentRequest {
    dataRequestKey?: string;
    articles?: Partial<IKlarnaArticle>[];
    shippingInfo?: IShippingInfo;
}

export class Pay extends ServiceParameter {
    set dataRequestKey(value: string) {
        this.set('dataRequestKey', value);
    }

    set articles(articles: IArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new Article(article))
        );
    }

    set shippingInfo(shippingInfo: IShippingInfo) {
        this.set('shippingInfo', new ShippingInfo(shippingInfo));
    }

    protected getGroups() {
        return super.getGroups({
            Articles: 'Article',
            ShippingInfo: 'ShippingInfo',
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
