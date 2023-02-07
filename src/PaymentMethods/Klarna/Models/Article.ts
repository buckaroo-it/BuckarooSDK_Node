import ArticleModel from "../../../Models/Article";
import Model from "../../../Models/Model";

export default class Article extends Model implements ArticleModel {
  identifier?: string;
  quantity?: number;
  price?: number;
  vatPercentage?: number;
  description?: string;
  constructor(data) {
    super();
    this.identifier = data.identifier;
    this.description = data.description;
    this.quantity = data.quantity;
    this.price = data.price;
    this.vatPercentage = data.vatPercentage;

    this.setKeys({
      price: "GrossUnitPrice",
    });
  }
}
