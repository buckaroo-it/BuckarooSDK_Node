import { ISubscription } from './Models/ISubscription'
import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'

export default class Subscriptions extends PaymentMethod {
    protected _paymentName = 'Subscriptions'
    protected _requiredFields: Array<keyof IConfig> = ['currency']

    _serviceVersion = 1
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
        this.setRequest(payload)
        return this
    }
    updateCombined(payload: ISubscription) {
        this.action = 'UpdateCombinedSubscription'
        this.request.data.startRecurrent = true
        this.setRequest(payload)
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
