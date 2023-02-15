import Model from "./Model";

export default interface IPhone {
  landline?: string
  mobile?: string
  fax?: string
}

export class Phone extends Model implements IPhone {
  landline?: string
  mobile?: string
  fax?: string
  constructor (data) {
    super()
    this.setParameters(data)
  }
}