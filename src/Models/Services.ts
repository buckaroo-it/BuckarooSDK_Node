import Parameters from "./Parameters";

export default class Services {
  public serviceList: Array<any> = [];
  constructor(data, model, action, pay) {
    this.serviceList.push(this.formatServices(data, model, action, pay));
  }
  formatServices(data, model, action, pay) {
    return {
      parameters: new Parameters(pay, data).parameterList,
      name: model.paymentName,
      version: model.serviceVersion,
      action: action,
    };
  }
}
