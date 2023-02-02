export default class Article {
  protected identifier?: string;
  protected type?: string;
  protected brand: string = "";
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
    this.brand = props.brand;
    this.manufacturer = props.manufacturer;
    this.unitCode = props.unitCode;
    this.quantity = props.quantity;
    this.price = props.price;
    this.vatCategory = props.vatCategory;
    this.vatPercentage = props.vatPercentage;
  }
}
