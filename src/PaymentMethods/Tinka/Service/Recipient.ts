import Address from "../Models/Address";
import Phone from "../Models/Phone";

export default class Recipient {
  constructor(data) {
    for (const dataKey in data) {
      if (typeof this[dataKey] !== 'function'){
        this[dataKey] = data[dataKey];
      } else {
        this[dataKey] = this[dataKey](data[dataKey]);
      }
    }
  }

  address = (data) => this.addressFormat(data);
  phone = (data) => this.phoneFormat(data);

  addressFormat(data) {
    return (data) ? new Address(data) : ""
  };

  phoneFormat(data) {
    return (data) ? new Phone(data) : ""
  };

}
