import { Address } from '../../../Models';

export class TinkaAddress extends Address {
    set houseNumber(value: string) {
        this.set('streetNumber', value);
    }

    set houseNumberAdditional(value: string) {
        this.set('streetNumberAdditional', value);
    }

    set zipcode(value: string) {
        this.set('postalCode', value);
    }
}
