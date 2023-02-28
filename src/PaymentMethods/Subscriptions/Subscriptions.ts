import Subscription, {ISubscription} from "./Models/Subscription";
import {IConfig} from "../../Utils/Types";
import PaymentMethod from "../PaymentMethod";
export class Subscriptions extends PaymentMethod {
    protected _paymentName = 'Subscriptions'
    protected _serviceVersion = 1
    protected requiredFields: Array<keyof IConfig> = ['currency']
    create(payload){
        this.action = 'CreateSubscription'

        this.setRequiredFields()

        const services = new Subscription(payload)

        this.setServiceList(services)

        return this.dataRequest()
    }
    update(payload:ISubscription){
        this.action = 'UpdateSubscription'

        this.setRequiredFields()

        const services = new Subscription(payload)

        this.setServiceList(services)

        return this.dataRequest()
    }
    createCombined(payload){
        this.action = 'CreateCombinedSubscription'

        const services = new Subscription(payload)

        this.setServiceList(services)

        return this
    }
}
