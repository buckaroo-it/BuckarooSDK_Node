import { ICustomer, IPaymentRequest, ServiceParameter } from '../../../Models';
import { Article, IBillinkArticle } from './Article';
import { BillinkCustomer } from './Customer';

export interface IPay extends IPaymentRequest {
    billing: ICustomer;
    shipping?: ICustomer;
    articles: IBillinkArticle[];
    trackandtrace?: string;
    VATNumber?: string;
    summaryImageUrl?: string;
}

export class Pay extends ServiceParameter {
    set billing(billing: ICustomer) {
        this.set('billing', new BillinkCustomer(billing));
        if (this.get('shipping') === undefined) {
            this.shipping = billing;
        }
    }

    set shipping(shipping: ICustomer) {
        this.set('shipping', new BillinkCustomer(shipping));
    }

    set articles(articles: IBillinkArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new Article(article))
        );
    }

    set trackandtrace(trackandtrace: string) {
        this.set('trackandtrace', trackandtrace);
    }

    set VATNumber(VATNumber: string) {
        this.set('VATNumber', VATNumber);
    }

    set summaryImageUrl(summaryImageUrl: string) {
        this.set('summaryImageUrl', summaryImageUrl);
    }

    protected getGroups() {
        return super.getGroups({
            Billing: 'BillingCustomer',
            Shipping: 'ShippingCustomer',
            Articles: 'Article',
        });
    }

    protected getCountable(countable: Capitalize<string>[] = []): Capitalize<string>[] {
        return super.getCountable(['Articles']);
    }
}
