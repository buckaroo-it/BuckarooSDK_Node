import { Address, Company, IAddress, ICompany, ICustomer, IPerson, IPhone, Model, Person } from "../../../Models";
import { In3Phone } from "./Phone";
import { RecipientCategory } from "../../../Constants";

export interface IIn3Recipient extends ICustomer {
    recipient: Partial<IIn3Company | IIn3Person>;
    phone: IPhone;
}

export class In3Recipient extends Model implements In3Recipient {
    get recipient(): In3Company | IIn3Person {
        return new In3Person({});
    }

    set recipient(value: In3Company | IIn3Person) {
        if (value.category === RecipientCategory.COMPANY) {
            this.set("recipient", new In3Company(value));
        } else if (value.category === RecipientCategory.PERSON) {
            this.set("recipient", new In3Person(value));
        } else throw new Error("Invalid recipient category");
    }

    get address(): IAddress {
        return new In3Address();
    }

    set address(value: IAddress) {
        this.set("address", new In3Address(value));
    }

    get email(): string {
        return "";
    }

    set email(value: string) {
        this.set("email", value);
    }

    get phone(): IPhone {
        return new In3Phone();
    }

    set phone(value: IPhone) {
        this.set("phone", new In3Phone(value));
    }
}

export interface IIn3Person extends IPerson {
    customerNumber: string;
    identificationNumber: string;
    conversationLanguage: string;
    lastName: string;
}

export interface IIn3Company extends ICompany {
    customerNumber: string;
}

export class In3Person extends Person implements IIn3Person {
    set category(value: RecipientCategory.PERSON) {
        this.set("category", "B2C");
    }

    set customerNumber(value: string) {
        this.set("customerNumber", value);
    }

    set identificationNumber(value: string) {
        this.set("identificationNumber", value);
    }

    set conversationLanguage(value: string) {
        this.set("conversationLanguage", value);
    }
}

export class In3Company extends Company implements IIn3Company {
    set category(value: RecipientCategory.COMPANY) {
        this.set("category", "B2B");
    }

    set customerNumber(value: string) {
        this.set("customerNumber", value);
    }

    get title() {
        return this.get("salutation");
    }

    set title(value: string) {
        this.set("salutation", value);
    }

    get chamberOfCommerce() {
        return this.get("cocNumber");
    }

    set chamberOfCommerce(value: string) {
        this.set("cocNumber", value);
    }
}

export class In3Address extends Address {
    get houseNumber() {
        return this.get("streetNumber");
    }

    set houseNumber(value: string) {
        this.set("streetNumber", value);
    }

    get houseNumberAdditional() {
        return this.get("streetNumberSuffix");
    }

    set houseNumberAdditional(value: string) {
        this.set("streetNumberSuffix", value);
    }

    get zipcode() {
        return this.get("postalCode");
    }

    set zipcode(value: string) {
        this.set("postalCode", value);
    }

    get country() {
        return this.get("countryCode");
    }

    set country(value: string) {
        this.set("countryCode", value);
    }
}
