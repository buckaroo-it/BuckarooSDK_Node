import { Model } from '../../../Models/Model';
import IAddress from '../../../Models/Interfaces/IAddress';
import { Address } from './Address';
import { IRecipient } from '../../../Models/Interfaces/IRecipient';
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
}
