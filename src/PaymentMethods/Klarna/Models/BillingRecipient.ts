import Address,{IAddress} from './Address'
import Person,{IPerson} from './Person'
import Phone,{IPhone} from './Phone'
import Model from '../../../Models/Model'

export declare interface IBillingRecipient  {
  recipient: IPerson
  address: IAddress
  email: string
  phone: IPhone
}
export default class BillingRecipient extends Model{
  recipient: IPerson | boolean = false
  address: Address | boolean = false
  email: string | boolean  = false
  phone: Phone | boolean = false
  constructor (data) {
    super()
    this.setParameters(data)
    this.phone = new Phone(this.phone)
    this.recipient = new Person(this.recipient)
    this.address = new Address(this.address)
  }

  groupType? (): string {
    return 'BillingCustomer'
  }
}
