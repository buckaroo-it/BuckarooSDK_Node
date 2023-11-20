import { Customer, IAddress, IPerson, IPhone } from '../../../Models';
import { TinkaAddress } from './Address';
import { TinkaPhone } from './Phone';
import { TinkaPerson } from './Person';

export class Recipient extends Customer {
    set address(value: IAddress) {
        this.set('address', new TinkaAddress(value));
    }

    set phone(value: IPhone) {
        this.set('phone', new TinkaPhone(value));
    }

    set recipient(value: IPerson) {
        this.set('recipient', new TinkaPerson(value));
    }
}
