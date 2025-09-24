import { IPaymentRequest, ServiceParameter } from '../../../Models';
import { IIn3Article, In3Article } from './Article';
import { IIn3Recipient, In3Recipient } from './Recipient';

export interface IPay extends IPaymentRequest {
    invoiceDate?: string;
    invoiceUrl?: string;
    route?: string;
    billing?: IIn3Recipient;
    shipping?: Partial<IIn3Recipient>;
    articles?: Partial<IIn3Article>[];
}

export default class Pay extends ServiceParameter {
    set invoiceDate(value: string) {
        this.set('invoiceDate', value);
    }

    set invoiceUrl(value: string) {
        this.set('invoiceUrl', value);
    }

    set route(value: string) {
        this.set('route', value);
    }

    get billing() {
        return new In3Recipient();
    }

    set billing(billing: IIn3Recipient) {
        this.set('billing', new In3Recipient(billing));
        if (this.get('shipping') === undefined) {
            this.shipping = billing;
        }
    }

    set shipping(shipping: IIn3Recipient) {
        this.set('shipping', new In3Recipient(shipping));
    }

    set articles(articles: In3Article[]) {
        this.set(
            'articles',
            articles.map((article) => new In3Article(article))
        );
    }

    protected getGroups(): {} {
        return super.getGroups({
            Billing: 'BillingCustomer',
            Shipping: 'ShippingCustomer',
            Articles: 'Article',
        });
    }

    protected getCountable() {
        return super.getCountable(['Articles']);
    }
}
