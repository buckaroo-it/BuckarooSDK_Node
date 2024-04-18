import { IRequest, ServiceParameter } from "../../../Models";
import { IMarketplace, Marketplace } from "./Marketplace";
import { ISeller, Seller } from "./Seller";

export interface ISplit extends IRequest {
    sellers?: ISeller[];
    marketplace?: IMarketplace;
    daysUntilTransfer?: number;
}

export class Split extends ServiceParameter {
    set seller(value: ISeller[]) {
        this.set(
            "sellers",
            value.map((seller: ISeller) => new Seller(seller))
        );
    }

    set marketplace(value: IMarketplace) {
        this.set("marketplace", new Marketplace(value));
    }

    set daysUntilTransfer(value: number) {
        this.set("daysUntilTransfer", value);
    }

    protected getCountable() {
        return super.getCountable(["Sellers"]);
    }

    protected getGroups() {
        return super.getGroups({
            Sellers: "Seller",
            Marketplace: "Marketplace",
        });
    }
}
