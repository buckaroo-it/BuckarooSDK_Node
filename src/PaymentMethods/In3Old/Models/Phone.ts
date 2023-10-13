import { Phone } from '../../../Models/Interfaces/IPhone';

export class In3OldPhone extends Phone {
    set mobile(number) {
        this.set('phone', number);
    }
}
