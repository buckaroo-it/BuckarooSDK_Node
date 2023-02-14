import BillingRecipient, { IBillingRecipient } from "./BillingRecipient";
import Article,{IArticle} from './Article'
import ShippingRecipient, { IShippingRecipient } from "./ShippingRecipient";
import Model from '../../../Models/Model'
import { IPayForm } from "../../../Models/PayForm";

export interface IPay extends IPayForm {
  billing: IBillingRecipient
  shipping?: IShippingRecipient
  articles: IArticle[]
}
export default class Pay extends Model{
  billing: BillingRecipient | boolean = false
  shipping?: ShippingRecipient
  articles: Article[] | boolean = false

  constructor (data) {
    super()
    this.setParameters(data)
    this.billing = new BillingRecipient(this.billing)
    this.shipping = new ShippingRecipient(data.shipping || this.billing)

    if (Array.isArray(this.articles)) {
      if(this.articles?.length === 0) {
        throw new Error('Missing Parameter:articles')
      }
      this.articles.map(value => new Article(value));
    }

  }
}
