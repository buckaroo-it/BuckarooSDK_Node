import { Model } from '../../../Models';

export class Phone extends Model {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set mobile(value: string) {
        this.set(`${this.get('prefix')}PhoneNumber`, value);
    }
}
