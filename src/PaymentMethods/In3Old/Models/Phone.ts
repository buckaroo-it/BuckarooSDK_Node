import { Phone } from '../../../Models';

export class In3OldPhone extends Phone {
    set mobile(number: string) {
        this.set('phone', number);
    }
}
