import Subscription, {ISubscription} from "./Models/Subscription";
import {IConfig} from "../../Utils/Types";
import PaymentMethod from "../PaymentMethod";
class Subscriptions extends PaymentMethod{
    protected _paymentName = 'Subscriptions'
    protected _serviceVersion = 0
    protected requiredFields: Array<keyof IConfig> = ['currency']
    create(payload:ISubscription):Promise<any>{
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
    createCombined(payload:ISubscription){
        this.action = 'CreateCombinedSubscription'

        const services = new Subscription(payload)

        this.setServiceList(services)

        return this
    }
    updateCombined(payload:Partial<ISubscription>){

        this.action = 'UpdateCombinedSubscription'

        this.request.setData('startRecurrent',true)

        this.setServiceList(new Subscription(<ISubscription>payload))
        return this
    }
    stop(payload:{subscriptionGuid:string}){
        this.action = 'StopSubscription'

        this.setRequiredFields()

        this.setServiceList(new Subscription(<ISubscription>payload))

        return this.dataRequest()
    }
    info(payload:{subscriptionGuid:string}){
        this.action = 'SubscriptionInfo'

        this.setRequiredFields()

        this.setServiceList(new Subscription(<ISubscription>payload))

        return this.dataRequest()
    }
    deletePaymentConfig(payload:{subscriptionGuid:string}){
        this.action = 'DeletePaymentConfiguration'

        this.setRequiredFields()

        this.setServiceList(new Subscription(<ISubscription>payload))

        return this.dataRequest()
    }

    pause(payload:{subscriptionGuid:string,resumeDate:string}){
        this.action = 'PauseSubscription'

        this.setRequiredFields()

        this.setServiceList(new Subscription(<ISubscription><unknown>payload))

        return this.dataRequest()
    }
    resume(payload:{subscriptionGuid:string,resumeDate:string}){
        this.action = 'ResumeSubscription'

        this.setRequiredFields()

        this.setServiceList(new Subscription(<ISubscription><unknown>payload))
        return this.dataRequest()
    }
}

const subscriptions = () => {
  return new Subscriptions()
}
export {
    subscriptions
}