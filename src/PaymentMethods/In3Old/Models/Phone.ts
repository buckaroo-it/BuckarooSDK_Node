import { Phone } from '../../../Models/Interfaces/IPhone';

export class In3OldPhone extends Phone {
    set mobile(number: string) {
        this.set('phone', number);
    }
}
