import { Phone } from '../../../Models/Interfaces/IPhone';

export class TinkaPhone extends Phone {
    set mobile(value: string) {
        this.set('phone', value);
    }
}
