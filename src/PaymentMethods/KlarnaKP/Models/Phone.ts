import { Person } from '../../../Models';

export class Phone extends Person {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set mobile(value: string) {
        this.set(`${this.get('prefix')}CellPhoneNumber`, value);
    }
}
