import { Address } from '../../../Models/Interfaces/IAddress';

export class In3OldAddress extends Address {
    set houseNumberAddition(houseNumberAddition: string) {
        this.set('houseNumberSuffix', houseNumberAddition);
    }
}
