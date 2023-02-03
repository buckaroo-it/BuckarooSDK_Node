import Recipient from "../Service/Recipient";
import Article from "./Article";

export default class Pay {
  billing = (data) => this.billingFormat(data);
  articles = (data) => this.articlesFormat(data);
  shipping = (data) => this.shippingFormat(data);

  billingFormat(data) {
    return {
      data: new Recipient(data),
      key: "BillingCustomer",
      groupID: "",
    };
  }
  shippingFormat(data) {
    return {
      data: new Recipient(data),
      key: "ShippingCustomer",
      groupID: "",
    };
  }
  articlesFormat(data) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    let articles: Array<Article> = [];
    for (const datum of data) {
      articles.push(new Article(datum));
    }
    return { data: articles, key: "Article", groupID: 1 };
  }
}
