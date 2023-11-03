import { IAddress, ICompany, ICustomer, IPerson, IPhone, Model } from '../../../Models';
import { RecipientCategory } from '../../../Constants';
import Phone from './Phone';
import Address from './Address';
import { AfterPayCompany, AfterPayPerson } from './Recipient';

export default class Customer extends Model implements ICustomer {
    set recipient(recipient: IPerson | ICompany) {
        if (recipient.category === RecipientCategory.PERSON) {
            this.set('recipient', new AfterPayPerson(recipient));
        } else if (recipient.category === RecipientCategory.COMPANY) {
            this.set('recipient', new AfterPayCompany(recipient));
        }
    }

    set address(address: IAddress) {
        this.set('address', new Address(address));
    }

    set email(email: string) {
        this.set('email', email);
    }

    set phone(phone: IPhone) {
        this.set('phone', new Phone(phone));
    }
}
