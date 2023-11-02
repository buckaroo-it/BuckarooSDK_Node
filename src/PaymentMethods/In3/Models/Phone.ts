import { Phone } from '../../../Models';

export class In3Phone extends Phone {
    set landline(value: string) {
        this.set('phone', value);
    }

    set mobile(value: string) {
        this.set('phone', value);
    }

    set fax(value: string) {
        this.set('phone', value);
    }
}
