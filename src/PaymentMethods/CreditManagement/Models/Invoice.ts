import { IAddress, ICompany, IDebtor, IPerson, IPhone, IRequest, ServiceParameter } from '../../../Models';
import { CreditArticle, ICreditArticle } from './Article';
import { Address } from './Address';

export interface IInvoice extends IRequest {
    invoiceAmount: number;
    invoiceAmountVAT?: number;
    invoiceDate: string;
    dueDate: string;
    schemeKey?: string;
    maxStepIndex?: number;
    allowedServices?: string;
    allowedServicesAfterDueDate?: string;
    code?: string;
    person: Partial<IPerson>;
    company: Partial<ICompany>;
    address: Partial<IAddress>;
    debtor: IDebtor;
    email?: string;
    phone: IPhone;
    articles?: ICreditArticle[];
    invoiceNumber?: string;
    applyStartRecurrent?: boolean;
}

export class Invoice extends ServiceParameter implements IInvoice {
    set invoiceAmount(value: number) {
        this.set('invoiceAmount', value);
    }

    set invoiceAmountVAT(value: number) {
        this.set('invoiceAmountVAT', value);
    }

    set invoiceDate(value: string) {
        this.set('invoiceDate', value);
    }

    set dueDate(value: string) {
        this.set('dueDate', value);
    }

    set schemeKey(value: string) {
        this.set('schemeKey', value);
    }

    set maxStepIndex(value: number) {
        this.set('maxStepIndex', value);
    }

    set allowedServices(value: string) {
        this.set('allowedServices', value);
    }

    set allowedServicesAfterDueDate(value: string) {
        this.set('allowedServicesAfterDueDate', value);
    }

    set code(value: string) {
        this.set('code', value);
    }

    set person(value: Partial<IPerson>) {
        this.set('person', value);
    }

    set company(value: Partial<ICompany>) {
        this.set('company', value);
    }

    set address(value: Partial<IAddress>) {
        this.set('address', new Address(value));
    }

    set debtor(value: IDebtor) {
        this.set('debtor', value);
    }

    set email(value: string) {
        this.set('email', value);
    }

    set phone(value: IPhone) {
        this.set('phone', value);
    }

    set articles(value: ICreditArticle[]) {
        this.set(
            'articles',
            value.map((article) => new CreditArticle(article))
        );
    }

    set invoiceNumber(value: string) {
        this.set('invoiceNumber', value);
    }

    set applyStartRecurrent(value: boolean) {
        this.set('applyStartRecurrent', value);
    }

    protected getGroups() {
        return super.getGroups({
            Articles: 'ProductLine',
            Address: 'Address',
            Company: 'Company',
            Person: 'Person',
            Debtor: 'Debtor',
            Email: 'Email',
            Phone: 'Phone',
        });
    }

    protected getCountable() {
        return super.getCountable(['Articles']);
    }
}
