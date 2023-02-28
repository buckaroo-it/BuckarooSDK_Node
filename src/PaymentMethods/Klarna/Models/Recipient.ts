import Address, { IAddress } from './Address'
import Person, { IPerson } from './Person'
import Phone, { IPhone } from './Phone'

class Recipient {
    recipient: Person
    address: Address
    email: string
    phone?: Phone
    constructor(data:IBillingRecipient | IShippingRecipient) {
        if (data.phone) {
            this.phone = new Phone(data.phone)
        }
        this.recipient = new Person(data.recipient)
        this.address = new Address(data.address)
        this.email = data.email
    }
}

export class BillingRecipient extends Recipient{
    constructor(data:IBillingRecipient) {
        super(data);
    }
    groupType(): string {
        return 'BillingCustomer'
    }
}
export declare interface IBillingRecipient {
    recipient: IPerson
    address: IAddress
    email: string
    phone: IPhone
}
export class ShippingRecipient extends Recipient{
    constructor(data:IShippingRecipient) {
        super(data);
    }
    groupType(): string {
        return 'ShippingCustomer'
    }
}
export interface IShippingRecipient {
    recipient: IPerson
    address: IAddress
    email: string
    phone?: IPhone
}