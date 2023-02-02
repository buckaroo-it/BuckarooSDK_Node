import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import PayPayload from "../../Models/PayPayload";

class AricleForm {
  protected identifier?: string;
  protected type?: string;
  protected brand: string = '';
  protected manufacturer?: string;
  protected unitCode?: string;
  protected quantity?: number;
  protected price?: number;
  protected vatCategory?: number;
  protected vatPercentage?: number;
  protected description?: string;

  constructor(props) {
    this.identifier = props.identifier;
    this.type = props.type;
    this.description = props.description;
  }
}

class Article extends AricleForm{
  // keys = {
  //   price: "vegim",
  //   address: "a"
  // }

  constructor(data) {
      super(data)

      for (const dataKey in this) {
        if (!this[dataKey]) {
        delete this[dataKey]
        }
      }
  }
  getKeyConfig(){
    // keys.price=
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
    if(!Array.isArray(data)){
      data = [data]
    }
    let articles:Array<Article> = []
    for (const datum of data) {
      articles.push(new Article(datum))
    }
    return {data: articles,key:'Article',groupID: 1}
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
