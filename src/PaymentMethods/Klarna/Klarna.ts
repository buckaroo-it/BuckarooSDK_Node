import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

class Article {
  // GrossUnitPrice:'' = ''
  constructor(data) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey]
    }
    // if(this['price']){
      // this.GrossUnitPrice = this['price']
      // delete  this['price']
    // }
  }
}

class Shipping {
  constructor(data) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey]
    }
  }

}

class Billing {
  constructor(data) {
    for (const dataKey in data) {
      this[dataKey] = data[dataKey]
    }
  }

}

class Pay {
  billing = (data) =>  this.billingFormat(data)
  articles = (data) =>  this.articlesFormat(data);

  shipping = (data) =>  this.shippingFormat(data);

  billingFormat(data) {
    return {data: new Billing(data),key:'Billing',groupID: ''}
  }
  shippingFormat(data) {
    return {data: new Shipping(data),key:'Shipping',groupID: ''};
  }
  articlesFormat(data) {
    return {data: new Article(data),key:'Article',groupID: 1}
  }
}

export default class Klarna extends PaymentMethod {
  public requiredConfigFields: string[];
  constructor(api: BuckarooClient) {
    super(api);
    this.paymentName = "klarna";
    this.requiredConfigFields = this.requiredFields;
  }

  async pay(model?) {
    let data = this.formatData(model, "Pay");
    return this.api.client.call(data, "POST");
  }

  payInInstallments(model?) {
    return model;
  }
  issuers(): any {
    return this;
  }
  formatData(data: {}, action) {
    const pay = new Pay();
    const newData = new PayPayload(data, this, action, pay);

    // console.log(JSON.stringify(newData));
    // return newData;
  }
}
