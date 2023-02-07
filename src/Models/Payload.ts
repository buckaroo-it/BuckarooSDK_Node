import Services from "./Services";

export default class Payload {
  public services: {} = {};
  constructor() {}
  setServices(data,paymentName,serviceVersion,action,pay){
    this.services = new Services(
        data,
        paymentName,
        serviceVersion,
        action,
        pay
    );
    return this;
  }
}
