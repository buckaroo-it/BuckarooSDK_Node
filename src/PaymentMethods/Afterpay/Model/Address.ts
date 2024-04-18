import { Address as IAddress } from "../../../Models";

export default class Address extends IAddress {
    get houseNumber(): string {
        return this.get("streetNumber");
    }

    set houseNumber(phone: string) {
        this.set("streetNumber", phone);
    }

    get houseNumberAdditional(): string {
        return this.get("streetNumberAdditional");
    }

    set houseNumberAdditional(phone: string) {
        this.set("streetNumberAdditional", phone);
    }

    get zipcode(): string {
        return this.get("postalCode");
    }

    set zipcode(phone: string) {
        this.set("postalCode", phone);
    }
}
