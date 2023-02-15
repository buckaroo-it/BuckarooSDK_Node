import IAddress,{Address} from "../../../Models/IAddress";
import IPerson,{Person} from "../../../Models/IPerson";
import IPhone,{Phone} from "../../../Models/IPhone";
import Model from '../../../Models/Model'

export declare interface IBillingRecipient  {
  recipient: IPerson
  address: IAddress
  email: string
  phone: IPhone
}
export default class BillingRecipient extends Model{
  recipient?: IPerson = undefined
  address?: IAddress = undefined
  email?: string = undefined
  phone?: IPhone|string = ''
  constructor (data) {
    super()
    if(data.address.country ===  'NL' || data.address.country === 'BE'){
      this.phone = undefined
    }
    this.setParameters(data)
    if(this.phone) {
      if (!data.phone.mobile && !data.phone.landline) {
        this.phone = {mobile:''}
      }
      this.phone = new Phone(this.phone).setKeys({
        landline: "Phone",
        mobile: "MobilePhone",
      })
    }
    this.recipient = new Person(this.recipient)

    this.address = new Address(this.address)
    console.log(this);
    throw new Error('sad')
  }

  groupType? (): string {
    return 'BillingCustomer'
  }
}
