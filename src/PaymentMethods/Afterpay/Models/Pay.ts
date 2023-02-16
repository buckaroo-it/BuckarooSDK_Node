import BillingRecipient, { IBillingRecipient } from "./BillingRecipient";
import Articles from './Articles'
import IArticle from "../../../Models/IArticle";
import ShippingRecipient, { IShippingRecipient } from "./ShippingRecipient";
import Model from '../../../Models/Model'
import { ITransactionData } from "../../../Models/TransactionData";

export interface IPay extends ITransactionData {
  billing: IBillingRecipient
  shipping?: IShippingRecipient
  articles: IArticle[]
}
export default class Pay extends Model {
  billing: BillingRecipient
  shipping: ShippingRecipient | BillingRecipient
  articles: Articles
  constructor (data) {
    super()
    this.billing = data.billing
    this.shipping = data.billing || this.billing
    this.articles = data.articles
    this.setParameters(data)

    this.billing = new BillingRecipient(this.billing)
    this.shipping = new ShippingRecipient(this.shipping)
    this.articles = new Articles(this.articles)

  }
}
