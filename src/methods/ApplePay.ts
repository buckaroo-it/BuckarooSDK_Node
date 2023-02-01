import PaymentMethod from "./paymentMethod";
import BuckarooClient from "../BuckarooClient";
import PayPayload from "../models/PayPayload";

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
  getEndpoint(path: string): string {
    return super.getEndpoint(path);
  }

  async pay(model?) {
    let urlFormatted = new URL(this.api.client.getTransactionUrl());

    let data = this.formatData(model, "Pay");

    let headers = this.api.client.getHeaders("POST", data);

    const options = {
      hostname: urlFormatted.host,
      path: urlFormatted.pathname + urlFormatted.search,
      method: "POST",
      headers: headers,
      data: JSON.stringify(data),
    };
    await this.api.client.call(options);
    return model;
  }

  payRemainder(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
  formatData(data: {}, action) {
    const pay = new Pay();
    const newData = new PayPayload(data, this, action, pay);

    console.log(JSON.stringify(newData));
    return newData;
  }
}
