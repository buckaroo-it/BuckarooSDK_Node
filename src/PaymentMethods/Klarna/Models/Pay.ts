import BillingRecipient, { IBillingRecipient } from "./BillingRecipient";
import { IArticle , Articles} from './Article'
import  { ShippingRecipient, IShippingRecipient } from "./ShippingRecipient";
import  { IPayForm } from "../../../Models/PayForm";

export interface IPay extends IPayForm {
  billing: IBillingRecipient
  shipping?: IShippingRecipient
  articles: IArticle[]
}
export default class Pay {
  billing: BillingRecipient
  shipping?: ShippingRecipient
  articles: Articles

  constructor (data) {
    this.billing = data.billing
    this.shipping = data.shipping || data.billing
    this.articles = data.articles

    this.billing = new BillingRecipient(data.billing)
    this.shipping = new ShippingRecipient(data.shipping || data.billing)
    this.articles = new Articles(data.articles)
  }
}
