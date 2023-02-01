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
  getEndpoint(path: string): string {
    return super.getEndpoint(path);
  }

  async pay(model?) {
    let data = this.formatData(model, "Pay");

    const options = this.api.client.getOptions(data, "POST");

    return this.api.client.call(options);
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
