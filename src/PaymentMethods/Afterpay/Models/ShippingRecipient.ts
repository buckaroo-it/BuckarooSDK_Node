import IAddress from '../../../Models/IAddress'
import IPerson from '../../../Models/IPerson'
import IPhone from '../../../Models/IPhone'

export declare interface IShippingRecipient {
    recipient: IPerson
    address: IAddress
    email?: string
    phone?: IPhone
}
export default class ShippingRecipient {
    recipient: IPerson
    address: IAddress
    email: string
    phone?: IPhone | string = ''
    constructor(data) {
        this.recipient = data.recipient
        this.address = data.address
        this.email = data.email
    }

    groupType?(): string {
        return 'BillingCustomer'
    }
}
