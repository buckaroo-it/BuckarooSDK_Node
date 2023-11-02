import { Address } from '../Services/Address';
import { ICustomer, Model } from '../../../Models';
import { Phone } from '../Services/Phone';
import { Recipient } from './Recipient';

export class Customer extends Model implements ICustomer {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set recipient(recipient: ICustomer['recipient']) {
        this.set('recipient', new Recipient({ prefix: this.get('prefix'), ...recipient }));
    }

    set address(address: ICustomer['address']) {
        this.set('address', new Address({ prefix: this.get('prefix'), ...address }));
    }

    set email(email: ICustomer['email']) {
        this.set(`${this.get('prefix')}Email`, email);
    }

    set phone(phone: ICustomer['phone']) {
        this.set('phone', new Phone({ prefix: this.get('prefix'), ...phone }));
    }
}
