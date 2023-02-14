import CompanyModel from '../../../Models/Company'
import Model from '../../../Models/Model'

export default class Company extends Model implements CompanyModel {
  culture?: string
  chamberOfCommerce?: string
  companyName?: string
  varNumber?: string
  vatApplicable?: boolean

  constructor (data) {
    super()
    this.culture = data.culture
    this.chamberOfCommerce = data.chamberOfCommerce
    this.companyName = data.companyName
    this.varNumber = data.varNumber
    this.vatApplicable = data.vatApplicable
    this.setKeys({
      companyName: 'Name'
    })
  }
}
