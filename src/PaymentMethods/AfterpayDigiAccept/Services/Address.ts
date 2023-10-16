import { Address as AddressClass } from '../../../Models/Interfaces/IAddress';

export class Address extends AddressClass {
    get houseNumberAdditional() {
        return this.get('houseNumberSuffix');
    }

    set houseNumberAdditional(value: string) {
        this.set('houseNumberSuffix', value);
    }

    get zipcode() {
        return this.get('postalCode');
    }

    set zipcode(value: string) {
        this.set('postalCode', value);
    }

    set country(value: string) {
        if (this.prefix === 'Shipping' && value === 'NL') {
            this.set('countryCode', value);
        } else this.set('country', value);
    }

    private get prefix() {
        return '';
    }

    private set prefix(value: string) {
        this.set('prefix', value);
    }

    initialize(data?: any, prefix: string = '') {
        this.set('prefix', prefix, true);
        return super.initialize(data);
    }

    protected privateName(name: string): string {
        return super.privateName(name);
    }
}
