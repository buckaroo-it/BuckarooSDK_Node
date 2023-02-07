import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";
import Verify from "./Models/Verify";

export default class Surepay extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "surepay";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async verify(model?) {
    return this.api.client.post(
      new PayPayload(model, this, "verify", new Verify()),
      this.api.client.getDataRequestUrl()
    );
  }
}
