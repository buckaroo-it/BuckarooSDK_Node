import { IPaymentRequest } from '../../../Models/IRequest';
import { IPerson, Person } from '../../../Models/Interfaces/IRecipient';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IPay extends IPaymentRequest {
    customer: Partial<IPerson>;
    sendMail?: boolean;
    dateDue?: string;
    customerCountry?: string;
}

class BankTransferPerson extends Person {
    set firstName(value: string) {
        this.set('customerFirstName', value);
    }

    set lastName(value: string) {
        this.set('customerLastName', value);
    }

    set gender(value: string) {
        this.set('customerGender', value);
    }
}

export class Pay extends ServiceParameter {
    set sendMail(sendMail: boolean) {
        this.set('sendMail', sendMail);
    }

    set dateDue(dateDue: string) {
        this.set('dateDue', dateDue);
    }

    set country(country: string) {
        this.set('customerCountry', country);
    }

    set customer(person: IPerson) {
        this.set('customer', new BankTransferPerson(person));
    }

    set email(email: string) {
        this.set('customerEmail', email);
    }
}
