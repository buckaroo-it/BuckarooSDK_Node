import { serviceParameterKeyOf } from '../Utils/Functions'

export default class Parameters {
  public parameterList: Array<{}> = []


  setUp (model, groupType: string = '', groupID: number | string = '') {
    for (const paramKey in model) {
      if (typeof model[paramKey] === 'object') {
        this.setUp(model[paramKey], model[paramKey].groupType?.() || groupType,
          model[paramKey].groupID?.(paramKey) || groupID)
      } else if( typeof model[paramKey] !== 'function') {
        this.setParamFormat(
          paramKey,
          model[paramKey],
          groupType,
          groupID
        )
      }
    }
  }

  setParamFormat (name, value, groupType, groupID) {
    this.parameterList.push({
      Name: serviceParameterKeyOf(name),
      Value: value,
      GroupType: groupType,
      GroupID: groupID
    })
  }

  addParameterList (pay) {
    this.setUp(pay)
    return this.parameterList
  }
}
