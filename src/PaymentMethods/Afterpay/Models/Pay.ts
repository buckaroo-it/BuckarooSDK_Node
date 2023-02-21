import { IBillingRecipient } from "./BillingRecipient";
import IArticle from "../../../Models/IArticle";
import { IShippingRecipient } from "./ShippingRecipient";
import { IPayForm, PayForm } from "../../../Models/PayForm";

export interface IPay extends IPayForm {
  billing: IBillingRecipient
  shipping?: IShippingRecipient
  articles: IArticle[]
}
export class Pay extends PayForm implements IPay {
  billing: IBillingRecipient
  shipping?: IShippingRecipient 
  articles: IArticle[]
  constructor (data:IPay) {
    super(data)
    this.billing = data.billing
    this.shipping = data.billing || this.billing
    this.articles = data.articles

  }
}
