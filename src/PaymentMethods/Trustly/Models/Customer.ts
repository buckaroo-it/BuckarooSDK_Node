import { Model } from '../../../Models';

export class Customer extends Model {
    set firstName(value: string) {
        this.set('CustomerFirstName', value);
    }

    set lastName(value: string) {
        this.set('customerLastName', value);
    }

    set countryCode(value: string) {
        this.set('customerCountryCode', value);
    }
}
