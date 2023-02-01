import Payload from "./Payload";
import Services from "./Services";

export default class PayPayload extends Payload {
  protected order: string = "";
  protected amountDebit: number = 0;

  constructor(data, model, action, pay) {
    super(data, model, action);
    this.order = this.uniqId("ORDER_NO_");

    this.setProperties(data, model, action, pay);
  }

  setProperties(data, model, action, pay) {
    for (const datum of model.requiredConfigFields) {
      this[datum] = model.api.config[datum] ? model.api.config[datum] : "";
    }
    for (const datum in data) {
      this[datum] = data[datum];
    }

    this.services = new Services(data, model, action, pay);
  }

  uniqId(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${
      random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
    }`;
  }
}
