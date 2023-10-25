import { Customer } from '../../../Models/Interfaces/ICustomer';
import IAddress from '../../../Models/Interfaces/IAddress';
import { TinkaAddress } from './Address';
import IPhone from '../../../Models/Interfaces/IPhone';
import { TinkaPhone } from './Phone';
import { TinkaPerson } from './Person';
import { IPerson } from '../../../Models/Interfaces/IRecipient';

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
