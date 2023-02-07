import Parameters from "./Parameters";
export default class Services {
  public serviceList: Array<any> = [];
  constructor(data:{}, paymentName:string,serviceVersion:number,action:string, pay:{}) {
    this.formatServices(data, paymentName, serviceVersion, action , pay);
  }
  formatServices(data: {}, paymentName: string, serviceVersion: number, action: string, pay: {}) {
    this.serviceList.push({
      parameters: new Parameters(pay, data).parameterList,
      name: paymentName,
      version: serviceVersion,
      action: action,
    });
  }
}
