import ArticleModel from "../../../Models/Article";

export default class Article implements ArticleModel {
  identifier?: string;
  type?: string;
  brand?: string;
  manufacturer?: string;
  unitCode?: string;
  quantity?: number;
  price?: number;
  vatCategory?: number;
  vatPercentage?: number;
  description?: string;
  constructor(data) {
    this.identifier = data.identifier;
    this.type = data.type;
    this.description = data.description;
    this.brand = data.brand;
    this.manufacturer = data.manufacturer;
    this.unitCode = data.unitCode;
    this.quantity = data.quantity;
    this.price = data.price;
    this.vatCategory = data.vatCategory;
    this.vatPercentage = data.vatPercentage;

    this.setKeys();
  }

  setKeys() {
    const keys: any = {
      price: "GrossUnitPrice",
    };

    for (let dataKey in this) {
      if (keys[dataKey]) {
        this[keys[dataKey]] = this[dataKey];
        delete this[dataKey];
      }
      if (!this[dataKey]) {
        delete this[dataKey];
      }
    }
  }
}
