import { uniqid } from "../Functions/Functions";

export default class PayForm {
    order?;
    currency?;
    amountDebit: number = 0;
    invoice:string = ''
    constructor() {
        this.order = uniqid("ORDER_NO_")
    }

}