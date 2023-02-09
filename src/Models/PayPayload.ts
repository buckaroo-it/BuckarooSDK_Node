import Payload from "./Payload";

export default class PayPayload extends Payload {
  protected paymentName;
  protected serviceVersion;

  constructor(method, action, pay) {
    super();
    this.serviceVersion = method.serviceVersion
    this.paymentName = method.paymentName;
    this.setProperties( method, action, pay);
  }

  setProperties( method, action, pay) {
    for (const datum of method.requiredConfigFields) {
      this[datum] = method.api.config[datum] ? method.api.config[datum] : "";
    }

    for (const dataKey in pay) {
      if(typeof pay[dataKey] !== "object" && typeof pay[dataKey] !== "function"
          && typeof pay[dataKey] !== "undefined"){
          this[dataKey] =  pay[dataKey]
          delete pay[dataKey]
      }
    }

    this.setServices(
        this.paymentName,this.serviceVersion,action,pay
    )

    console.log(this,this.services.ServiceList[0].parameters);
    throw new Error('SSSS')
  }
}
