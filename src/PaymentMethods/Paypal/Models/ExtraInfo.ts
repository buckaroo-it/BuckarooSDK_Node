import { IPaymentRequest, IPerson, IPhone, Person, ServiceParameter } from "../../../Models";
import { Phone } from "./Phone";
import { Address, IAddress } from "./Address";

export interface IExtraInfo extends IPaymentRequest {
    address?: IAddress;
    customer?: Partial<IPerson>;
    phone?: IPhone;
    noShipping?: string;
    addressOverride?: boolean;
}

export class ExtraInfo extends ServiceParameter {
    set address(value: IAddress) {
        this.set("address", new Address(value));
    }

    set customer(value: IPerson) {
        this.set("customer", new Person(value));
    }

    set phone(value: IPhone) {
        this.set("phone", new Phone(value));
    }

    set noShipping(value: string) {
        this.set("noShipping", value);
    }

    set addressOverride(value: boolean) {
        this.set("addressOverride", value);
    }
}
