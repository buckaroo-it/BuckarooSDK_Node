import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import Verify from "./Models/Verify";
import Services from "../../Models/Services";

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
    let services = {
      Services: new Services(
        model,
        this.paymentName,
        this.serviceVersion,
        "verify",
        new Verify()
      ),
    };
    return this.api.client.post(services, this.api.client.getDataRequestUrl());
  }
}
