import Address, { IAddress } from "./Address";
import Person, { IPerson } from "./Person";
import Phone from './Phone'
import Model from '../../../Models/Model'

export interface IShippingRecipient {
  recipient:IPerson
  address: IAddress
  email: string
  phone?: Phone
}
export class ShippingRecipient extends Model{
  recipient:IPerson | boolean = false
  address: IAddress | boolean = false
  email: string = ''
  phone?: Phone
  constructor (data) {
    super()
    this.setParameters(data)
    if (this.phone) {
      this.phone = new Phone(data.phone)
    }
    this.recipient = new Person(this.recipient)
    this.address = new Address(this.address)
  }

  groupType? (): string {
    return 'ShippingCustomer'
  }
}
