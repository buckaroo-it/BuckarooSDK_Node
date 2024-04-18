import { Model } from "../../../Models";

export class Address extends Model {
    set prefix(value: string) {
        this.set("prefix", value, true);
    }

    set street(value: string) {
        this.set(`${this.get("prefix")}Street`, value);
    }

    set street2(value: string) {
        this.set(`${this.get("prefix")}Street2`, value);
    }

    set zipcode(value: string) {
        this.set(`${this.get("prefix")}PostalCode`, value);
    }

    set city(value: string) {
        this.set(`${this.get("prefix")}City`, value);
    }

    set country(value: string) {
        this.set(`${this.get("prefix")}Country`, value);
    }
}
