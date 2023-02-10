import BillingRecipient from "./BillingRecipient";
import Article from "./Article";
import ShippingRecipient from "./ShippingRecipient";
import Model from "../../../Models/Model";


export default class Pay{
    billing:BillingRecipient;
    shipping?:ShippingRecipient;
    articles:Array<Article>;

    constructor(data) {
        this.billing = new BillingRecipient(data['billing'] || '');
        this.shipping = new ShippingRecipient(data['shipping'] || data['billing'] || '');


        if (data['articles'].length===0){
            throw new Error('Missing Parameter:articles')
        }
        let articles: Array<Article> = [];

        data['articles'].forEach(value => {
            articles.push(new Article(value))
        })
        this.articles = articles;
        Model.setParameters(this,data)
    }
}
