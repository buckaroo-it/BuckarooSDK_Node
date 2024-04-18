import { Address as AddressClass } from "../../../Models";

export class Address extends AddressClass {
    set houseNumberAdditional(value: string) {
        this.set("houseNumberSuffix", value);
    }
}
