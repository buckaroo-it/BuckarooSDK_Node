import { Model } from '../Model';

export default interface IAddress {
    street: string;
    houseNumber: string;
    houseNumberAdditional: string;
    zipcode: string;
    city: string;
    state?: string;
    country: string;
}

export class Address extends Model implements IAddress {
    set street(street: string) {
        this.set('street', street);
    }

    set houseNumber(houseNumber: string) {
        this.set('houseNumber', houseNumber);
    }

    set houseNumberAdditional(houseNumberAdditional: string) {
        this.set('houseNumberAdditional', houseNumberAdditional);
    }

    set zipcode(zipcode: string) {
        this.set('zipcode', zipcode);
    }

    set city(city: string) {
        this.set('city', city);
    }

    set state(state: string) {
        this.set('state', state);
    }

    set country(country: string) {
        this.set('country', country);
    }
}
