import { Address } from "../../../Models";

export class In3OldAddress extends Address {
    set houseNumberAddition(houseNumberAddition: string) {
        this.set("houseNumberSuffix", houseNumberAddition);
    }
}
