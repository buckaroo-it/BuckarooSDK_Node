import { Address as AddressClass } from '../../../Models/Interfaces/IAddress';
export class Address extends AddressClass {
    set houseNumberAdditional(value: string) {
        this.set('houseNumberSuffix', value);
    }
}
