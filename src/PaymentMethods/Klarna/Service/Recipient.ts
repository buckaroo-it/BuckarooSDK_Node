import Address from "../Models/Address";
import Phone from "../Models/Phone";

export default class Recipient {
  constructor(data) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey];
    }
  }

  // recipient = (data) => this.recipientFormat(data);
  address = (data) => this.addressFormat(data);
  phone = (data) => this.phoneFormat(data);

  // recipientFormat = (data) => {};

  addressFormat = (data: any = "") => {
    if (!Array.isArray(data)) {
      data = [data];
    }
    let address: Array<Address> = [];
    for (const datum of data) {
      address.push(new Address(datum));
    }
    return address;
  };

  phoneFormat = (data: any = "") => {
    if (!Array.isArray(data)) {
      data = [data];
    }
    let phone: Array<Phone> = [];
    for (const datum of data) {
      phone.push(new Phone(datum));
    }
    return phone;
  };
}
