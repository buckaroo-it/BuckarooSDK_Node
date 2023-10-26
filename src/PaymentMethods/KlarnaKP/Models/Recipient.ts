import { Model } from '../../../Models/Model';

export class Recipient extends Model {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set firstName(value: string) {
        this.set(`${this.get('prefix')}FirstName`, value);
    }

    set lastName(value: string) {
        this.set(`${this.get('prefix')}LastName`, value);
    }
}
