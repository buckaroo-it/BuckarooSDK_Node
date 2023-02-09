import Address from "../Models/Address";
import Person from "../Models/Person";
import Phone from "../Models/Phone";

export default class ShippingRecipient {
    groupType?: string = '';
    recipient:Person;
    address:Address;
    email:string = ''
    phone?:Phone
    constructor(data) {
        this.groupType = 'ShippingCustomer'
        this.recipient =  new Person(data.recipient)
        this.address =  new Address(data.address)
        this.email =  data.email

        if(data.phone) {
            this.phone = new Phone(data.phone)
        }
    }
}
