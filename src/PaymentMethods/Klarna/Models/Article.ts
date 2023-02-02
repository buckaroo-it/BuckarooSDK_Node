import ArticleModel from "../../../Models/Article";

export default class Article extends ArticleModel {
  // keys = {
  //   price: "GrossUnitPrice",
  // };

  constructor(data) {
    super(data);

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
