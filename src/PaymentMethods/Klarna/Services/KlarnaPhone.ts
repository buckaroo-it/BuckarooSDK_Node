import { Phone } from "../../../Models";

export class KlarnaPhone extends Phone {
    get mobile(): string {
        return this.get("phone");
    }

    set mobile(mobile: string) {
        this.set("phone", mobile);
    }
}
