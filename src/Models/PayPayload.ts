import Payload from "./Payload";
import Services from "./Services";

export default class PayPayload extends Payload {
  protected order: string = "";
  protected amountDebit: number = 0;
  protected paymentName;
  protected serviceVersion;

  constructor(data, method, action, pay) {
    super(data, method, action);
    this.order = this.uniqId("ORDER_NO_");
    this.paymentName = method.paymentName
    this.serviceVersion = method.serviceVersion

    this.setProperties(data, method, action, pay);
  }

  setProperties(data, method, action, pay) {
    for (const datum of method.requiredConfigFields) {
      this[datum] = method.api.config[datum] ? method.api.config[datum] : "";
    }
    for (const datum in data) {
      this[datum] = data[datum];
    }

    console.log(this)
    throw new Error('s');
    this.services = new Services(data, this, action, pay);

    console.log(this.services.serviceList[0].parameters)
    throw new Error('s');
  }

  uniqId(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${
      random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
    }`;
  }
}
