import { ICompany, IPerson } from '../../../Models/Interfaces/IRecipient';
import IAddress from '../../../Models/Interfaces/IAddress';
import IPhone from '../../../Models/Interfaces/IPhone';
import { Model } from '../../../Models/Model';
import RecipientCategory from '../../../Constants/RecipientCategory';
import Phone from './Phone';
import Address from './Address';
import { AfterPayCompany, AfterPayPerson } from './Recipient';
import { ICustomer } from '../../../Models/Interfaces/ICustomer';

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
