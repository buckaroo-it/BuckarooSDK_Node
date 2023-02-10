import { serviceParameterKeyOf } from "../Functions/Functions";

export default class Parameters {
  public parameterList: {}[] = [];

  constructor(pay) {
    this.setUp(pay);
  }

  setUp(model , groupType: string = "", groupID: number | string = "") {
    for (const paramKey in model) {
      if (typeof model[paramKey] === "object") {
        this.setUp(model[paramKey], model[paramKey].groupType?.() || groupType,
            model[paramKey].groupID?.(paramKey) || groupID);
      } else  {
        this.setParamFormat(
            paramKey,
            model[paramKey],
            groupType,
            groupID
        );
      }
    }
  }

  setParamFormat(name, value, groupType, groupID) {
    this.parameterList.push({
      Name: serviceParameterKeyOf(name),
      Value: value,
      GroupType: groupType,
      GroupID: groupID,
    });
  }
  getParameterList(){
    return  this.parameterList
  }
}
