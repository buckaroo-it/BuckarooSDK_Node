import Model from "./Model";

export default interface IAddress {
  street?: string
  houseNumber?: string
  houseNumberAdditional?: string
  zipcode?: string
  city?: string
  state?: string
  country?: string
}
export class Address extends Model implements IAddress{
  city: string = '';
  country: string = '';
  houseNumber: string = '';
  houseNumberAdditional: string = '';
  state: string = '';
  street: string = '';
  zipcode: string = '';

}