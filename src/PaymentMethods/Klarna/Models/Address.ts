// import IAddress from "../../../Models/IAddress";
import Model from "../../../Models/Model";

export default class Address {
  country: string = '';
  street: string = '';
  houseNumber:string  = '';
  houseNumberAdditional?:string
  zipcode: string = '';
  city: string = '';

  constructor(data) {

    Model.setParameters(this,data)
    Model.setKeys(this,{
      houseNumber: "StreetNumber",
      houseNumberAdditional: "StreetNumberAdditional",
      zipcode: "PostalCode",
    })
  }
}
