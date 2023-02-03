// import AddressModel  from "../../../Models/Address";
import {AddressParams} from "../../../Models/Address";
export default class Address {
  constructor(data) {

    this.setKeys(data);
  }

  setKeys(data) {
    const keys: any = {
      houseNumber: "StreetNumber",
      houseNumberAdditional: "StreetNumberAdditional",
      zipcode: "PostalCode",
    };

    for (const key in AddressParams) {
        if(keys[key]){
          this[keys[key]] = data[key]
        }else if(data[key]){
          this[AddressParams[key]] = data[key]
        }
    }
  }
}
