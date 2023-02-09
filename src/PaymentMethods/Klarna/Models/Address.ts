import IAddress from "../../../Models/IAddress";
export default class Address implements IAddress{
  country?: string;
  street: string;
  streetNumber?: string;
  houseNumberAdditional:string
  zipcode?: string;
  city?: string;
  houseNumber?: string;
  state?: string;
  constructor(data:IAddress) {
    this.street = data.street || '';
    this.streetNumber = data.houseNumber;
    this.houseNumberAdditional = data.houseNumberAdditional || '';
    this.zipcode = data.zipcode;
    this.city = data.city;
    this.state = data.state || data.country;
    // this.setKeys({
    //   houseNumber: "StreetNumber",
    //   houseNumberAdditional: "StreetNumberAdditional",
    //   zipcode: "PostalCode",
    // });
  }
}
