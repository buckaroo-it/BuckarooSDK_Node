import { Phone as PhoneClass } from "../../../Models";

export class Phone extends PhoneClass {
    set mobile(value: string) {
        this.set("phone", value);
    }
}
