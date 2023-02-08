import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import PaymentMethod from "../PaymentMethod";
import Pay from "./Models/Pay";
import ExtraInfo from "./Models/ExtraInfo";

export default class Paypal extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];

  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "paypal";
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    );
  }

  async pay(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }

  payRecurrent(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "PayRecurrent", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }

  extraInfo(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay,ExtraInfo", new ExtraInfo()),
      this.api.client.getTransactionUrl()
    );
  }
}
