import { Model } from '../../../Models/Model';

export class Customer extends Model {
    set firstName(value: string) {
        this.set('CustomerFirstName', value);
    }
    set lastName(value: string) {
        this.set('customerLastName', value);
    }
}
