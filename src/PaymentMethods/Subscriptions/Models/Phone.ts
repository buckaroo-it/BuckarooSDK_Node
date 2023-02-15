import PhoneModel from '../../../Models/IPhone'
import Model from '../../../Models/Model'
export default class Phone extends Model implements PhoneModel {
  landline?: string
  mobile?: string
  fax?: string
  constructor (data) {
    super()
    this.mobile = data.mobile
    this.landline = data.landline
    this.fax = data.fax
    this.setKeys({
      mobile: 'Phone'
    })
  }
}
