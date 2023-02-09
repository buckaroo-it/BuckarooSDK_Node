import Address from "../Models/Address";
// import Phone from "../Models/Phone";
import Person from "../Models/Person";
import Phone from "../Models/Phone";

export default class Recipient {
  private groupType?: string = '';

  recipient:Person;
  address:Address;
  email:string = ''
  phone:Phone
  constructor(data,groupType) {
    this.groupType = groupType
    this.recipient =  new Person(data.recipient)
    this.address =  new Address(data.address)
    this.email =  data.email

    this.phone =  new Phone(data.phone)
  }
}
