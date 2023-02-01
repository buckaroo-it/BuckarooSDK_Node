import Parameters from "./Parameters";

export default class Services {
  public serviceList: Array<any> = [];
  constructor(data, model, action, pay) {
    this.serviceList.push(this.formatServices(data, model, action, pay));
  }
  formatServices(data, model, action, pay) {
    let formatedService = {
      parameters: {}[""],
      name: model.paymentName,
      version: model.serviceVersion,
      action: action,
    };
    formatedService.parameters = new Parameters(pay, data).parameterList;
    console.log(formatedService);
    return formatedService;
  }
}
