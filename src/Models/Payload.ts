import Services from "./Services";

export default class Payload {
  public services: {} = {};
  constructor() {}
  setServices(paymentName,serviceVersion,action,pay){
    this.services = new Services(
        paymentName,
        serviceVersion,
        action,
        pay
    );
    return this;
  }
}
