import { Address } from '../Services/Address';
import { Model } from '../../../Models/Model';
import { Phone } from '../Services/Phone';
import { ICustomer } from '../../../Models/Interfaces/ICustomer';

export class Customer extends Model implements ICustomer {
    constructor(data?: ICustomer, prefix?: string) {
        super(data, prefix);
    }
    get prefix() {
        return '';
    }
    initialize(data?: any, prefix: string = '') {
        this.set('prefix', prefix, true);
        return super.initialize(data);
    }
    set recipient(recipient: ICustomer['recipient']) {
        this.set('recipient', recipient);
    }
    set address(address: ICustomer['address']) {
        this.set('address', new Address(address, this.prefix));
    }
    set email(email: ICustomer['email']) {
        this.set(this.prefix + 'Email', email);
    }
    set phone(phone: ICustomer['phone']) {
        this.set('phone', new Phone(phone));
    }
}
