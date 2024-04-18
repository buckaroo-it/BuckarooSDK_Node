import { Model } from "../../../Models";

export interface ISubtotal {
    name: string;
    value: number;
}

export class Subtotal extends Model implements ISubtotal {
    set name(name: string) {
        this.set("name", name);
    }

    set value(value: number) {
        this.set("value", value);
    }
}
