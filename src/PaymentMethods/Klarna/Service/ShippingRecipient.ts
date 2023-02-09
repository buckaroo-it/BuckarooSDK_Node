import Address from "../Models/Address";
import Person from "../Models/Person";

export default class ShippingRecipient {
    constructor() {
    }
    recipient:Person = new Person();
    address:Address = new Address()
    email:string = ''
}
