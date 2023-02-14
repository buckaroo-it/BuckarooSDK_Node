// import Model from "../../../Models/Model";
// import BillingRecipient from "../../Klarna/Models/BillingRecipient";
// import ShippingRecipient from "../../Klarna/Models/ShippingRecipient";
// import Article from "../../Klarna/Models/Article";
//
// export default class Pay extends Model{
//   billing: BillingRecipient
//   shipping?: ShippingRecipient
//   articles: Article[]
//
//   constructor (data) {
//     super()
//     this.billing = new BillingRecipient(data.billing || '')
//     this.shipping = new ShippingRecipient(data.shipping || data.billing || '')
//
//     if (data.articles.length === 0) {
//       throw new Error('Missing Parameter:articles')
//     }
//     const articles: Article[] = []
//
//     data.articles.forEach(value => {
//       articles.push(new Article(value))
//     })
//     this.articles = articles
//     this.setParameters(data)
//   }
// }
