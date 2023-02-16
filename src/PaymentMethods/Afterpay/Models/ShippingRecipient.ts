import IAddress,{Address} from "../../../Models/IAddress";
import IPerson,{Person} from "../../../Models/IPerson";
import IPhone,{Phone} from "../../../Models/IPhone";
import Model from '../../../Models/Model'

export declare interface IShippingRecipient  {
  recipient: IPerson
  address: IAddress
  email?: string
  phone?: IPhone
}
export default class ShippingRecipient{
  recipient: IPerson
  address: IAddress
  email: string
  phone?: IPhone|string = ''
  constructor (data) {
    this.recipient = data.recipient
    this.address = data.address
    this.email = data.email

  }

  groupType? (): string {
    return 'BillingCustomer'
  }
}
