import { Address, Company, IAddress, ICompany, IPerson, IPhone, Model, Person, Phone } from './../';
import { RecipientCategory } from '../../Constants';

export interface ICustomer {
    phone?: Partial<IPhone>;
    email?: string;
    recipient?: Partial<IPerson | ICompany>;
    address?: Partial<IAddress>;
}

export class Customer extends Model {
    set address(address: Partial<IAddress>) {
        this.set('address', new Address(address));
    }

    set email(email: string) {
        this.set('email', email);
    }

    set phone(phone: Partial<IPhone>) {
        this.set('phone', new Phone(phone));
    }

    set recipient(recipient: IPerson | ICompany) {
        if (recipient.category === RecipientCategory.PERSON) {
            this.set('recipient', new Person(recipient));
        } else if (recipient.category === RecipientCategory.COMPANY) {
            this.set('recipient', new Company(recipient));
        }
    }
}
