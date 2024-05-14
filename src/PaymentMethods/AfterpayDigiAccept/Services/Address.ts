import { Model } from '../../../Models';

export class Address extends Model {
    set prefix(value: string) {
        this.set('prefix', value, true);
    }

    set street(value: string) {
        this.set(`${this.get('prefix')}Street`, value);
    }

    set houseNumber(value: string) {
        this.set(`${this.get('prefix')}HouseNumber`, value);
    }

    set city(value: string) {
        this.set(`${this.get('prefix')}City`, value);
    }

    set houseNumberAdditional(value: string) {
        this.set(`${this.get('prefix')}HouseNumberSuffix`, value);
    }

    set zipcode(value: string) {
        this.set(`${this.get('prefix')}PostalCode`, value);
    }

    set country(value: string) {
        if (this.get('prefix') === 'shipping' && value === 'NL') {
            this.set(`${this.get('prefix')}CountryCode`, value);
        } else this.set(`${this.get('prefix')}Country`, value);
    }
}
