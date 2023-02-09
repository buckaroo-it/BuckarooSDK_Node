import Recipient from "../Service/Recipient";
import Article from "./Article";
import PayForm from "../../../Models/PayForm";
import ShippingRecipient from "../Service/ShippingRecipient";


export default class Pay extends PayForm{
    currency = '';
    billing:Recipient;
    shipping?:ShippingRecipient;
    articles:Array<Article>;

    constructor(data) {
        super();
        this.billing = new Recipient(data,'BillingCustomer');
        this.shipping = new Recipient(data['shipping'] || data['billing'],'ShippingCustomer');

        if (!Array.isArray(data['articles'])) {
            data['articles'] = [data['articles']];
        }
        let articles: Array<Article> = [];

        for (const datum of data['articles']) {
            articles.push(new Article(datum));
        }
        this.articles = articles
    }
}
