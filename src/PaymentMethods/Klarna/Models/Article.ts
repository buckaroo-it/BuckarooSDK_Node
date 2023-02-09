
export default class Article   {
  identifier?: string;
  quantity?: number;
  price: number;
  vatPercentage?: number;
  description?: string;
  groupType?:string = 'Article'
  grossUnitPrice?: number;
  constructor(data) {

    this.identifier = data.identifier;
    this.description = data.description;
    this.quantity = data.quantity;
    this.price = data.grossUnitPrice ||  data.price;

    this.vatPercentage = data.vatPercentage;

    if(this.price){
      this.grossUnitPrice = this.price
      delete this.price
    }
    // this.setKeys({
    //   price: "GrossUnitPrice",
    // });
  }
}
