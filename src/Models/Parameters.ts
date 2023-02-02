export default class Parameters {
  public parameterList: {}[] = [];
  constructor(pay, data) {
    this.setUp(pay, data);
  }
  setUp(pay, data ,groupType?,groupID?) {
    let param;

    for (const payKey in pay) {
      if(typeof pay[payKey] === "function"){
        let temp = pay[payKey](data[payKey]);
        this.setUp(temp.data , data[payKey],temp.key,temp.groupID)
        continue
      }
      if(typeof data[payKey] ==='object'){
        if(groupType==="Article"){

          this.setUp(pay[groupID-1], data[payKey] ,groupType,groupID)

        }else{
          this.setUp(data[payKey], data[payKey] ,groupType,groupID)

        }
        if(typeof groupID == 'number'){
          groupID++;
        }
        continue
      }
      param = {
        name: payKey,
        value: data[payKey] || pay[payKey],
        groupType: groupType,
        groupID: groupID,
      };
      this.parameterList.push(param);
    }
  }
}
