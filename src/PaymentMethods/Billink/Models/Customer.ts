import IPhone from '../../../Models/Interfaces/IPhone';
import { Phone } from './Phone';
import IAddress from '../../../Models/Interfaces/IAddress';
import { Address } from './Address';
import { Customer } from '../../../Models/Interfaces/ICustomer';
import { Company, ICompany, IPerson, Person } from '../../../Models/Interfaces/IRecipient';
import recipientCategory from '../../../Constants/RecipientCategory';

export class BillinkCustomer extends Customer {
    set address(address: IAddress) {
        this.set('address', new Address(address));
    }
    set phone(phone: IPhone) {
        this.set('phone', new Phone(phone));
    }
    set recipient(recipient: IPerson | ICompany) {
        if (recipient.category === recipientCategory.PERSON) {
            this.set('recipient', new BillinkPerson(recipient));
        } else if (recipient.category === recipientCategory.COMPANY) {
            this.set('recipient', new BillinkCompany(recipient));
        } else throw new Error('Invalid recipient category');
    }
}

export class BillinkPerson extends Person {
    set category(category: recipientCategory.PERSON) {
        this.set('category', 'B2C');
    }
    set title(title: string) {
        this.set('salutation', title);
    }
}
export class BillinkCompany extends Company {
    set category(category: recipientCategory.COMPANY) {
        this.set('category', 'B2B');
    }
    set title(title: string) {
        this.set('salutation', title);
    }
}
