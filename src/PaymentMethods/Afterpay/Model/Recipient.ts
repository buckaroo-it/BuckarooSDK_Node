import { Company, IPerson, Person } from "../../../Models";

export class AfterPayCompany extends Company {
    set title(title: string) {
        this.set("salutation", title);
    }

    set chamberOfCommerce(chamberOfCommerce: string) {
        this.set("identificationNumber", chamberOfCommerce);
    }
}

export interface IAfterPayPerson extends IPerson {
    customerNumber?: string;
    identificationNumber?: string;
    conversationLanguage?: string;
}

export class AfterPayPerson extends Person {
    constructor(data: IAfterPayPerson) {
        super(data);
    }

    set customerNumber(customerNumber: string) {
        this.set("customerNumber", customerNumber);
    }

    set identificationNumber(identificationNumber: string) {
        this.set("identificationNumber", identificationNumber);
    }

    set conversationLanguage(conversationLanguage: string) {
        this.set("conversationLanguage", conversationLanguage);
    }
}
