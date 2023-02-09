import Parameters from "./Parameters";

class serviceList {
  parameters?:{}[]
  name: string;
  version: number;
  action: string;
  constructor(paymentName:string,serviceVersion:number,action:string, pay:{}) {
    if(pay && Object.keys(pay).length > 0){
      this.parameters = new Parameters(pay).parameterList
    }else{
      delete this.parameters
    }
    this.name = paymentName
    this.version = serviceVersion
    this.action = action
  }

}

export default class Services {
  ServiceList:[serviceList]

  constructor(paymentName:string,serviceVersion:number,action:string, pay:{}) {
    this.ServiceList  = [new serviceList(paymentName,serviceVersion,action, pay)]
  }
}
