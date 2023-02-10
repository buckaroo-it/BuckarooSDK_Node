import Address from "./Address";
// import Phone from "../Models/Phone";
import Person from "./Person";
import Phone from "./Phone";
import Model from "../../../Models/Model";

export default class BillingRecipient {
  recipient:Person;
  address:Address;
  email:string;
  phone:Phone;
  constructor(data) {
    this.phone =  new Phone(data.phone || '')
    this.recipient =  new Person(data.recipient || '')
    this.address =  new Address(data.address || '')
    this.email =  data.email || ''
    Model.setParameters(this,data)
  }
  groupType?(): string {
    return 'BillingCustomer';
  }
}
