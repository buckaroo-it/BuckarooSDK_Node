import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import Article from './Article';
import IArticle from '../../../Models/Interfaces/IArticle';
import { Customer } from './Customer';
import { ICustomer } from '../../../Models/Interfaces/ICustomer';

export interface IPay extends IPaymentRequest {
    b2b: boolean;
    addressesDiffer: boolean;
    customerIPAddress: string;
    shippingCosts: number;
    costCentre: string;
    department: string;
    establishmentNumber: number;
    billing: ICustomer;
    shipping?: ICustomer;
    articles: Partial<IArticle>[];
}
export class Pay extends ServiceParameter implements Omit<IPay, keyof IPaymentRequest> {
    protected getGroups() {
        return super.getGroups({
            Articles: 'Article',
        });
    }
    protected getCountable() {
        return super.getCountable(['Articles']);
    }
    set addressesDiffer(value: boolean) {
        this.set('addressesDiffer', value);
    }
    set articles(articles: IArticle[]) {
        this.set(
            'articles',
            articles.map((article) => new Article(article))
        );
    }
    set b2b(value: boolean) {
        this.set('b2b', value);
    }
    set billing(billing: ICustomer) {
        this.set('billing', new Customer(billing, 'Billing'));
        if (this.get('shipping') === undefined) {
            this.shipping = billing;
        }
    }
    set shipping(shipping: ICustomer) {
        this.addressesDiffer = true;
        this.set('shipping', new Customer(shipping, 'Shipping'));
    }
    set costCentre(value: string) {
        this.set('costCentre', value);
    }
    set customerIPAddress(value: string) {
        this.set('customerIPAddress', value);
    }
    set department(value: string) {
        this.set('department', value);
    }
    set establishmentNumber(value: number) {
        this.set('establishmentNumber', value);
    }
    set shippingCosts(value: number) {
        this.set('shippingCosts', value);
    }
    protected accept: boolean = true;
}
