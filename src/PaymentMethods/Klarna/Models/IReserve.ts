import { Gender } from '../../../Constants';
import { ICustomer, IRequest, ServiceParameter } from '../../../Models';
import { Customer } from './Customer';
import Article, { IKlarnaArticle } from './Article';

export interface IReserve extends IRequest {
    gender?: Gender.MALE | Gender.FEMALE;
    billing?: ICustomer;
    shipping?: ICustomer;
    articles?: Partial<IKlarnaArticle>[];
    operatingCountry?: string;
    dataRequestKey?: string;
    shippingSameAsBilling?: boolean;
    pno?: string;
}

export class Reserve extends ServiceParameter implements IReserve {
    set dataRequestKey(value: string) {
        this.set('dataRequestKey', value);
    }

    set gender(value: Gender.MALE | Gender.FEMALE) {
        this.set('gender', value);
    }

    set operatingCountry(value: string) {
        this.set('operatingCountry', value);
    }

    set pno(value: string) {
        this.set('pno', value);
    }

    set billing(value: ICustomer) {
        this.set('billing', new Customer({ prefix: 'billing', ...value }));
    }

    set shipping(value: ICustomer) {
        this.set('shipping', new Customer({ prefix: 'shipping', ...value }));
    }

    set articles(value: IKlarnaArticle[]) {
        this.set(
            'articles',
            value.map((article) => new Article(article))
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
