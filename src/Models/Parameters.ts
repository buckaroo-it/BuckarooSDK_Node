export default class Parameters {
  public parameterList: {}[] = [];
  constructor(pay, data) {
    this.setUp(pay, data);
  }
  setUp(pay, data: {}, groupType: string = "", groupID: number | string = "") {
    for (const paramKey in pay) {
      if (typeof pay[paramKey] === "function") {
        let payLoadObject = pay[paramKey](data[paramKey]);
        this.setUp(
          payLoadObject.data,
          data[paramKey],
          payLoadObject.groupType,
          payLoadObject.groupID
        );
      } else if (typeof pay[paramKey] === "object") {
        if (typeof groupID === "number") {
          groupID++;
        }
        this.setUp(pay[paramKey], pay[paramKey], groupType, groupID);
      } else if (pay[paramKey]) {
        this.setParamFormat(paramKey, pay[paramKey], groupType, groupID);
      }
    }
  }
  setParamFormat(name, value, groupType, groupID) {
    this.parameterList.push({
      Name: this.serviceParameterKeyOf(name),
      Value: value,
      GroupType: groupType,
      GroupID: groupID,
    });
  }
  serviceParameterKeyOf(propertyName) {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
  }
}
