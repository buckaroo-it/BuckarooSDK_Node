import { Article as ArticleClass } from "../../../Models";

export default class Article extends ArticleClass {
    get description(): string {
        return this.get("title");
    }

    set description(description: string) {
        this.set("title", description);
    }

    get vatPercentage(): number {
        return this.get("vat");
    }

    set vatPercentage(value: number) {
        this.set("vat", value);
    }

    get identifier(): string {
        return this.get("number");
    }

    set identifier(identifier: string) {
        this.set("number", identifier);
    }

    set(name: string, value: any, hidden: boolean = false): this {
        this.defineProperty(`article${name.charAt(0).toUpperCase() + name.slice(1)}`, value, hidden);
        return this;
    }
}
