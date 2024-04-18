import { Address as AddressClass } from "../../../Models";

export class Address extends AddressClass {
    set houseNumber(houseNumber: string) {
        this.set("streetNumber", houseNumber);
    }

    set houseNumberAdditional(houseNumberAdditional: string) {
        this.set("streetNumberAdditional", houseNumberAdditional);
    }

    set zipcode(zipcode: string) {
        this.set("postalCode", zipcode);
    }
}
