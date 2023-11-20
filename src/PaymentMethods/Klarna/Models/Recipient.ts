import { Company, IAddress, ICompany, ICustomer, IPerson, IPhone, Model, Person } from '../../../Models';
import { KlarnaAddress } from '../Services/KlarnaAddress';
import { KlarnaPhone } from '../Services/KlarnaPhone';
import { RecipientCategory } from '../../../Constants';

export class KlarnaRecipient extends Model implements ICustomer {
    set email(email: string) {
        this.set('email', email);
    }

    set address(address: IAddress) {
        this.set('address', new KlarnaAddress(address));
    }

    set recipient(recipient: Partial<IPerson | ICompany>) {
        if (recipient.category === RecipientCategory.PERSON) {
            // @ts-ignore
            this.set('recipient', new Person({ ...recipient, category: 'B2C' }));
        } else if (recipient.category === RecipientCategory.COMPANY) {
            // @ts-ignore
            this.set('recipient', new Company({ ...recipient, category: 'B2B' }));
        }
    }

    set phone(phone: IPhone) {
        this.set('phone', new KlarnaPhone(phone));
    }
}
