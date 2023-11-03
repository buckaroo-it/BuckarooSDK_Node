import { Phone } from './Phone';
import { Address } from './Address';
import { Company, Customer, IAddress, ICompany, IPerson, IPhone, Person } from '../../../Models';
import { RecipientCategory } from '../../../Constants';

export class BillinkCustomer extends Customer {
    set address(address: IAddress) {
        this.set('address', new Address(address));
    }

    set phone(phone: IPhone) {
        this.set('phone', new Phone(phone));
    }

    set recipient(recipient: IPerson | ICompany) {
        if (recipient.category === RecipientCategory.PERSON) {
            this.set('recipient', new BillinkPerson(recipient));
        } else if (recipient.category === RecipientCategory.COMPANY) {
            this.set('recipient', new BillinkCompany(recipient));
        } else throw new Error('Invalid recipient category');
    }
}

export class BillinkPerson extends Person {
    set category(category: RecipientCategory.PERSON) {
        this.set('category', 'B2C');
    }

    set title(title: string) {
        this.set('salutation', title);
    }
}

export class BillinkCompany extends Company {
    set category(category: RecipientCategory.COMPANY) {
        this.set('category', 'B2B');
    }

    set title(title: string) {
        this.set('salutation', title);
    }
}
