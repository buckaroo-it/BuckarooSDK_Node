import { Phone } from '../../../Models';

export class TinkaPhone extends Phone {
    set mobile(value: string) {
        this.set('phone', value);
    }
}
