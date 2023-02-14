import Charge from './Charge'
export default class RatePlan {
  type
  ratePlanGuid
  ratePlanCode
  startDate
  endDate
  Charge = (data) => this.chargeFormat(data)

  constructor (key, data) {
    this.type = key
    for (const dataKey in data) {
      if (typeof this[dataKey] !== 'function') {
        this[dataKey] = data[dataKey]
      } else {
        this[dataKey] = this[dataKey](data[dataKey])
      }
    }
  }

  chargeFormat (data) {
    return {
      data: new Charge(data),
      groupType: 'RatePlanCharge',
      groupID: ''
    }
  }
}
