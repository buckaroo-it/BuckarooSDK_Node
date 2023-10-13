import { IPaymentRequest } from '../../../Models/IRequest';
import { ITinkaArticle, TinkaArticle } from './Article';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { ICustomer } from '../../../Models/Interfaces/ICustomer';
import { ITinkaPerson, TinkaPerson } from './Person';
import { Recipient } from './Recipient';
export interface IPay extends IPaymentRequest {
    paymentMethod: string;
    deliveryMethod: string;
    deliveryDate?: string;
    articles: Partial<ITinkaArticle>[];
    customer: ITinkaPerson;
    shipping?: ICustomer;
    billing: ICustomer;
}
export class Pay extends ServiceParameter {
    protected getGroups() {
        return super.getGroups({
            Articles: 'Article',
            Shipping: 'ShippingCustomer',
            Billing: 'BillingCustomer',
        });
    }
    protected getCountable() {
        return super.getCountable(['Articles']);
    }

    set paymentMethod(value: string) {
        this.set('paymentMethod', value);
    }
    set deliveryMethod(value: string) {
        this.set('deliveryMethod', value);
    }
    set deliveryDate(value: string) {
        this.set('deliveryDate', value);
    }
    set articles(value: ITinkaArticle[]) {
        this.set(
            'articles',
            value.map((article) => new TinkaArticle(article))
        );
    }
    set customer(value: ITinkaPerson) {
        this.set('customer', new TinkaPerson(value));
    }
    set shipping(value: ICustomer) {
        this.set('shipping', new Recipient(value));
    }
    set billing(value: ICustomer) {
        this.set('billing', new Recipient(value));
        if (this.shipping === undefined) {
            this.shipping = value;
        }
    }
}
