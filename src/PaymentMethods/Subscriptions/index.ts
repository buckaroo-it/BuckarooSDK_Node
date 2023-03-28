import { services, ISubscription } from './Models/Services'
import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import {ITransaction} from "../../Models/ITransaction";
class Subscriptions extends PaymentMethod {
    protected _paymentName = 'Subscriptions'
    protected _requiredFields: Array<keyof IConfig> = ['currency']

    serviceParametersStrategy(data): any {
        return services(data)
    }

    create(payload: ISubscription): Promise<any> {
        this.action = 'CreateSubscription'
        return this.dataRequest(payload)
    }
    update(payload: ISubscription) {
        this.action = 'UpdateSubscription'
        return this.dataRequest(payload)
    }
    createCombined(payload: ISubscription) {
        this.action = 'CreateCombinedSubscription'
        this.setRequest(<ITransaction>payload)
        return this
    }
    updateCombined(payload: ISubscription) {
        this.action = 'UpdateCombinedSubscription'
        this.request.setDataKey('startRecurrent', true)
        this.setRequest(<ITransaction>payload)
        return this
    }
    stop(payload: { subscriptionGuid: string }) {
        this.action = 'StopSubscription'
        return this.dataRequest(payload)
    }
    info(payload: { subscriptionGuid: string }) {
        this.action = 'SubscriptionInfo'

        return this.dataRequest(payload)
    }
    deletePaymentConfig(payload: { subscriptionGuid: string }) {
        this.action = 'DeletePaymentConfiguration'

        return this.dataRequest(payload)
    }

    pause(payload: { subscriptionGuid: string; resumeDate: string }) {
        this.action = 'PauseSubscription'

        return this.dataRequest(payload)
    }
    resume(payload: { subscriptionGuid: string; resumeDate: string }) {
        this.action = 'ResumeSubscription'

        return this.dataRequest(payload)
    }
}
let _subscriptions: Subscriptions
const subscriptions = () => {
    if (!_subscriptions) _subscriptions = new Subscriptions()
    return _subscriptions
}
export default subscriptions
