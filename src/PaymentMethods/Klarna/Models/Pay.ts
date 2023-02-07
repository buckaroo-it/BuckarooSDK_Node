import Recipient from "../Service/Recipient";
import Article from "./Article";

export default class Pay {

  shippingRecipient: Recipient = new Recipient({});

  billing = (data) => this.billingFormat(data);
  articles = (data) => this.articlesFormat(data);
  shipping = (data) => this.shippingFormat(data);

  billingFormat(data) {
    this.shippingRecipient = new Recipient(data);
    return {
      data: new Recipient(data),
      groupType: "BillingCustomer",
      groupID: "",
    };
  }
  shippingFormat(data) {
    return {
      data:  data ? new Recipient(data) :  this.shippingRecipient,
      groupType: "ShippingCustomer",
      groupID: "",
    }
  }
  articlesFormat(data) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    let articles: Array<Article> = [];
    for (const datum of data) {
      articles.push(new Article(datum));
    }
    return { data: articles, groupType: "Article", groupID: 0};
  }
}