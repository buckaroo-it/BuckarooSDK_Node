import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import Pay from "./Models/Pay";

export default class Tinka extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  public serviceVersion = 1;
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "Tinka";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async pay(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "Pay", new Pay()),
      this.api.client.getTransactionUrl()
    );
  }
}
