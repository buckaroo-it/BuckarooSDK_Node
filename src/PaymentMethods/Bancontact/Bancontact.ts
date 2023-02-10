import PaymentMethod from "../PaymentMethod";
import BuckarooClient from "../../BuckarooClient";
import Transaction from "../../Models/Transaction";
import Pay from "./Models/Pay";
import PayEncrypted from './Models/PayEncrypted';
import Authenticate from './Models/Authenticate';
import PayRecurring from "./Models/PayRecurring";

export default class Bancontact extends PaymentMethod{

    public requiredConfigFields: string[];
    constructor(api: BuckarooClient) {
        super(api);
        this.paymentName = "bancontactmrcash";
        this.requiredConfigFields = this.requiredFields;
    }

    async pay(model:Pay){
        return this.api.client.post(
            new Transaction(model, this, "Pay", new Pay()),
            this.api.client.getTransactionUrl()
        );
    }
    async payEncrypted(model:PayEncrypted){
        return this.api.client.post(
            new Transaction(model, this, "PayEncrypted", new PayEncrypted()),
            this.api.client.getTransactionUrl()
        );
    }
    async payRecurring(model:PayRecurring){
        return this.api.client.post(
            new Transaction(model, this, "PayRecurring", new PayRecurring()),
            this.api.client.getTransactionUrl()
        );
    }
    async authenticate(model:Authenticate){
        return this.api.client.post(
            new Transaction(model, this, "authenticate", new Authenticate()),
            this.api.client.getTransactionUrl()
        );
    }
}