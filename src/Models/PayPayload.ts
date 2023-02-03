import Payload from "./Payload";
import Services from "./Services";
import { uniqid } from "../Functions/Functions";

export default class PayPayload extends Payload {
  protected order: string = "";
  protected amountDebit: number = 0;
  protected paymentName;
  protected serviceVersion;

  constructor(data, method, action, pay) {
    super(data, method, action);
    this.order = uniqid("ORDER_NO_");
    this.paymentName = method.paymentName;
    this.serviceVersion = method.serviceVersion;

    this.setProperties(data, method, action, pay);
  }

  setProperties(data, method, action, pay) {
    for (const datum of method.requiredConfigFields) {
      this[datum] = method.api.config[datum] ? method.api.config[datum] : "";
    }
    for (const datum in data) {
      if (typeof data[datum] !== 'object'){
        this[datum] = data[datum];
      }
    }
    this.services = new Services(data, this, action, pay);
    console.log(this)
    console.log(this.services.serviceList[0].parameters);
    throw new Error("s");
  }
}
