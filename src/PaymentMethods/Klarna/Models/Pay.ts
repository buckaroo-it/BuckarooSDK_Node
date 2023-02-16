import BillingRecipient, { IBillingRecipient } from "./BillingRecipient";
import Article,{IArticle,Articles} from './Article'
import ShippingRecipient, { IShippingRecipient } from "./ShippingRecipient";
import Model from '../../../Models/Model'
import PayForm, { ITransactionData } from "../../../Models/PayForm";

export interface IPay extends ITransactionData {
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
    for (const dataKey in this) {
      if (typeof this[dataKey] === undefined){
        throw new Error('Missing Required Parameter:' + dataKey + ' in Pay Klarna')
      }
    }
    this.billing = new BillingRecipient(data.billing)
    this.shipping = new ShippingRecipient(data.shipping || data.billing)
    this.articles = new Articles(data.articles)
  }
}
