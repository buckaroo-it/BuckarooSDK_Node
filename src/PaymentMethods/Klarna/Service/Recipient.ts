import Address from "../Models/Address";
import Phone from "../Models/Phone";

export default class Recipient {
  constructor(data) {
    for (const dataKey in data) {
      if (typeof this[dataKey] !== 'function'){
        this[dataKey] = data[dataKey];
      }
    }
  }

  // recipient = (data) => this.recipientFormat(data);
  address = (data) => this.addressFormat(data);
  phone = (data) => this.phoneFormat(data);

  // recipientFormat = (data) => {};

  addressFormat(data) {
    // throw new Error('d')
     return {
      data: new Address(data),
       key: "ShippingCustomer",
       groupID: "",
    };
  };

  phoneFormat(data) {
    // if (data)
      return {
        data: new Phone(data),
        key: "ShippingCustomer",
        groupID: "",
      };
    // return new Phone(data);
    // return '';
  };
}
