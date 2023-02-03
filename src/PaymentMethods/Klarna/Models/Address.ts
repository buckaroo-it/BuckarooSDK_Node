import AddressModel from "../../../Models/Address";

export default class Address extends AddressModel {
  constructor(data) {
    super(data);

    this.setKeys();
  }

  setKeys() {
    const keys: any = {
      houseNumber: "StreetNumber",
      houseNumberAdditional: "StreetNumberAdditional",
      zipcode: "PostalCode",
    };

    for (let dataKey in this) {
      if (keys[dataKey]) {
        this[keys[dataKey]] = this[dataKey];
        delete this[dataKey];
      }
      if (!this[dataKey]) {
        delete this[dataKey];
      }
    }
  }
}
