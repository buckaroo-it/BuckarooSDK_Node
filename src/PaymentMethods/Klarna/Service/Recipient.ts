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

  address = (data, key) => this.addressFormat(data, key);
  phone = (data, key) => this.phoneFormat(data,key);


  addressFormat(data, key) {
     return {
       data: new Address(data),
       key: key,
       groupID: "",
    };
  };

  phoneFormat(data,key) {
      return {
        data: new Phone(data),
        key: key,
        groupID: "",
      };
  };
}
