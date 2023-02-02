import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

class Pay {
  issuer: string = "";
}

export default class Ideal extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [
    "currency",
    "returnURL",
    "returnURLCancel",
    "pushURL",
  ];

  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "ideal";
    this.requiredConfigFields = this.requiredFields.concat(
      this.requiredConfigFields
    );
  }

  async pay(model?) {
    return this.api.client.call(
      new PayPayload(model, this, "Pay", new Pay()),
      "POST"
    );
  }

  payRemainder(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
}
