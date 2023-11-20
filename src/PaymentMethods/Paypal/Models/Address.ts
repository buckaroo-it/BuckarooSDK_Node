import { Address as AddressClass, IAddress as IAddressGlobal } from '../../../Models';

export interface IAddress extends Partial<IAddressGlobal> {
    street: string;
    street2?: string;
}

export class Address extends AddressClass {
    set street2(value: string) {
        this.set('street2', value);
    }

    get street() {
        return this.get('street1');
    }

    set street(value: string) {
        this.set('street1', value);
    }

    get city() {
        return this.get('cityName');
    }

    set city(value: string) {
        this.set('cityName', value);
    }

    get state() {
        return this.get('stateOrProvince');
    }

    set state(value: string) {
        this.set('stateOrProvince', value);
    }

    get zipcode() {
        return this.get('postalCode');
    }

    set zipcode(value: string) {
        this.set('postalCode', value);
    }
}
