import Payload from "../models/Payload";
import PaymentMethod from "./paymentMethod";
import BuckarooClient from "../BuckarooClient";
import PayPayload from "../models/PayPayload";

class Pay {
  countableProperties: Array<string> = ["articles"];
  billingRecipient = "";
  shippingRecipient = "";
  _articles = [];
  groupData = {
    articles: {
      groupType: "Article",
    },
  };
  billing(data) {
    console.log("a", data);
  }
  shipping(data) {
    console.log("b", data);
  }

  articles(data) {
    console.log("c", data);
  }
}

export default class Klarna extends PaymentMethod {
  public requiredConfigFields: string[];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "klarna";
    this.requiredConfigFields = this.requiredFields;
  }
  getEndpoint(path: string): string {
    return super.getEndpoint(path);
  }

  async pay(model?) {
    let url = new URL(this.api.client.getTransactionUrl());

    let data = this.formatData(model, "Pay");
    console.log(data);
    // const options = this.api.client.getOptions(url, data, "POST");

    // return this.api.client.call(options);
  }

  payInInstallments(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
  formatData(data: {}, action) {
    const pay = new Pay();
    console.log(pay);
    const newData = new PayPayload(data, this, action, pay);

    // console.log(JSON.stringify(newData));
    // return newData;
  }
}
