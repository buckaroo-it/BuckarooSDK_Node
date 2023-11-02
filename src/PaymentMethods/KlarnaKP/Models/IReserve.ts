import { Gender } from '../../../Constants';
import { IArticle, ICustomer, IRequest, ServiceParameter } from '../../../Models';
import { Customer } from './Customer';
import Article from './Article';

export interface IReserve extends IRequest {
    gender?: Gender.MALE | Gender.FEMALE;
    billing?: ICustomer;
    shipping?: ICustomer;
    articles?: Partial<IArticle>[];
    operatingCountry?: string;
    reservationNumber?: string;
    shippingSameAsBilling?: boolean;
    pno?: string;
}

export class Reserve extends ServiceParameter implements IReserve {
    set reservationNumber(value: string) {
        this.set('reservationNumber', value);
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

    set articles(value: IArticle[]) {
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
