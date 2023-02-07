import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import Verify from "./Models/Verify";
import Payload from "../../Models/Payload";

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
    return this.api.client.post(new Payload().setServices(
        model,
        this.paymentName,
        this.serviceVersion,
        "verify",
        new Verify()
    ), this.api.client.getDataRequestUrl());
  }
}
