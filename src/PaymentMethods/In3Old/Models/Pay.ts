import { IAddress, IArticle, ICompany, IPaymentRequest, IPerson, IPhone, Person, ServiceParameter } from "../../../Models";
import { RecipientCategory } from "../../../Constants";
import { In3OldArticle } from "./Article";
import { ISubtotal, Subtotal } from "./Subtotal";
import { In3OldCompany } from "./Company";
import { In3OldAddress } from "./Address";
import { In3OldPhone } from "./Phone";

export interface IPay extends IPaymentRequest {
    description: string;
    clientIP: string;
    customerType: RecipientCategory.PERSON | RecipientCategory.COMPANY;
    invoiceDate: string;
    email: string;
    phone: Partial<IPhone>;
    company: Partial<ICompany>;
    customer: Partial<IPerson>;
    address: Partial<IAddress>;
    articles: Partial<IArticle>[];
    subtotals: ISubtotal[];
}

export class Pay extends ServiceParameter {
    set customerType(value: RecipientCategory) {
        this.set("customerType", value);
    }

    set invoiceDate(value: string) {
        this.set("invoiceDate", value);
    }

    set email(value: string) {
        this.set("email", value);
    }

    set phone(value: Partial<IPhone>) {
        this.set("phone", new In3OldPhone(value));
    }

    set company(value: Partial<ICompany>) {
        this.set("company", new In3OldCompany(value));
    }

    set customer(value: Partial<IPerson>) {
        this.set("customer", new Person(value));
    }

    set address(value: Partial<IAddress>) {
        this.set("address", new In3OldAddress(value));
    }

    set articles(value: Partial<IArticle>[]) {
        this.set(
            "articles",
            value.map((article) => new In3OldArticle(article))
        );
    }

    set subtotals(value: ISubtotal[]) {
        this.set(
            "subtotals",
            value.map((subtotal) => new Subtotal(subtotal))
        );
    }

    protected getGroups() {
        return super.getGroups({
            Articles: "ProductLine",
            Subtotals: "SubtotalLine",
            Address: "Address",
            Customer: "Person",
            Company: "Company",
            Phone: "Phone",
            Email: "Email",
        });
    }

    protected getCountable() {
        return super.getCountable(["Articles", "Subtotals"]);
    }
}
