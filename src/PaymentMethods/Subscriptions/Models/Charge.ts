import Model from '../../../Models/Model'

export default class Charge extends Model {
  ratePlanChargeGuid
  ratePlanChargeCode
  baseNumberOfUnits
  pricePerUnit
  vatPercentage

  constructor (data) {
    super()
    this.ratePlanChargeGuid = data.ratePlanChargeGuid
    this.ratePlanChargeCode = data.ratePlanChargeCode
    this.baseNumberOfUnits = data.baseNumberOfUnits
    this.pricePerUnit = data.pricePerUnit
    this.vatPercentage = data.vatPercentage
  }
}
