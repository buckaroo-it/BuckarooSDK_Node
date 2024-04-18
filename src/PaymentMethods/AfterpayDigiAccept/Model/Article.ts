import { Article as ArticleClass } from "../../../Models";

export default class Article extends ArticleClass {
    get identifier(): string {
        return this.get("articleId");
    }

    set identifier(identifier: string) {
        this.set("articleId", identifier);
    }

    get quantity(): number {
        return this.get("articleQuantity");
    }

    set quantity(quantity: number) {
        this.set("articleQuantity", quantity);
    }

    get price(): number {
        return this.get("articleUnitprice");
    }

    set price(price: number) {
        this.set("articleUnitprice", price);
    }

    get vatCategory(): string {
        return this.get("articleVatcategory");
    }

    set vatCategory(vatCategory: string) {
        this.set("articleVatcategory", vatCategory);
    }

    get description(): string {
        return this.get("articleDescription");
    }

    set description(description: string) {
        this.set("articleDescription", description);
    }
}
