import AddressModel from "../../../Models/Address";
export default class Address implements AddressModel {
  street?: string;
  houseNumber?: string;
  houseNumberAdditional?: string;
  zipcode?: string;
  city?: string;
  country?: string;

  constructor(data) {
    this.street = data.street;
    this.houseNumber = data.houseNumber;
    this.houseNumberAdditional = data.houseNumberAdditional;
    this.zipcode = data.zipcode;
    this.city = data.city;
    this.country = data.country;

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
    }
  }
}
