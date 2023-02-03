import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

class Pay {
  paymentData: string = "";
  customerCardName: string = "";
}

export default class ApplePay extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "applepay";
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

  payRemainder(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
}
