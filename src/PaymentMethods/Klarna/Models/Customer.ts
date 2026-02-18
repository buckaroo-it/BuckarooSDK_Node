import { IAddress, IRecipient, IPhone, Model } from '../../../Models';
import { Address } from './Address';
import { Phone } from './Phone';
import { Recipient } from './Recipient';

export class Customer extends Model {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set email(value: string) {
        this.set(`${this.get('prefix')}Email`, value);
    }

    set address(address: Partial<IAddress>) {
        this.set('address', new Address({ prefix: this.get('prefix'), ...address }));
    }

    set recipient(recipient: Partial<IRecipient>) {
        this.set('recipient', new Recipient({ prefix: this.get('prefix'), ...recipient }));
    }

    set phone(phone: Partial<IPhone>) {
        this.set('phone', new Phone({ prefix: this.get('prefix'), ...phone }));
    }
}
