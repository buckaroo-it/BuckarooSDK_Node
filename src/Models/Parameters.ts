import { serviceParameterKeyOf } from "../Functions/Functions";

export default class Parameters {
  public parameterList: {}[] = [];

  constructor(pay) {
    this.setUp(pay);
  }

  setUp(pay , groupType: string = "", groupID: number | string = "") {
    console.log(pay)

    throw new Error('DDD')
    for (const paramKey in pay) {
      console.log(paramKey)
      throw new Error('DDD')
      // if (typeof pay[paramKey] === "function") {
      //   let payLoadObject = pay[paramKey](data[paramKey]);
      //   console.log(paramKey,pay,data)
      //   console.log(payLoadObject)
      //   throw new Error('DDD')
      //   this.setUp(
      //     payLoadObject.data,
      //     data[paramKey],
      //     payLoadObject.groupType,
      //     payLoadObject.groupID
      //   );
      // } else
      if (typeof pay[paramKey] === "object") {
        if (typeof groupID === "number") {
          groupID++;
        }
        this.setUp(paramKey, groupType, groupID);
      } else {
        this.setParamFormat(
            paramKey,
            pay[paramKey] ,
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
}
