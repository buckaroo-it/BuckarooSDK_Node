import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import Pay from "./Models/Pay";

export default class Afterpay extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];

  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "afterpay";
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
}