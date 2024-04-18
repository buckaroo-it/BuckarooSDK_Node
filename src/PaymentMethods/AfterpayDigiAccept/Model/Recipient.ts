import { Model } from "../../../Models";

export class Recipient extends Model {
    set prefix(value: string) {
        this.set("prefix", value, true);
    }

    set companyName(value: string) {
        this.set("companyName", value);
    }

    set vatNumber(value: string) {
        this.set("vatNumber", value);
    }

    set chamberOfCommerce(value: string) {
        this.set("companyCOCRegistration", value);
    }

    set initials(value: string) {
        this.set(`${this.get("prefix")}Initials`, value);
    }

    set birthDate(value: string) {
        this.set(`${this.get("prefix")}BirthDate`, value);
    }

    set gender(value: string) {
        this.set(`${this.get("prefix")}Gender`, value);
    }

    set firstName(value: string) {
        this.set(`${this.get("prefix")}FirstName`, value);
    }

    set lastName(value: string) {
        this.set(`${this.get("prefix")}LastName`, value);
    }
}
