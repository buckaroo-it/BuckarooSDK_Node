export default class Address {
  protected street?: string;
  protected houseNumber?: string;
  protected houseNumberAdditional?: string;
  protected zipcode?: string;
  protected city?: string;
  protected state?: string;
  protected country?: string;

  constructor(props) {
    this.street = props.street;
    this.houseNumber = props.houseNumber;
    this.houseNumberAdditional = props.houseNumberAdditional;
    this.zipcode = props.zipcode;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
  }
}

export const AddressParams = {
  street: 'Street',
  houseNumber : 'HouseNumber',
  houseNumberAdditional:'HouseNumberAdditional',
  zipcode:'Zipcode',
  city:'City',
  state:'State',
  country:'Country'
}