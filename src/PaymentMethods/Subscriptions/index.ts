import { ISubscription, Subscription } from './Models/ISubscription';
import { PaymentMethod } from '../../Services';
import { IRequest } from '../../Models';
import { ResumeSubscription } from './Models/ResumeSubscription';
import { ServiceCode } from '../../Utils';

export default class Subscriptions extends PaymentMethod {
    protected _serviceVersion = 1;
    protected _requiredFields: Array<keyof IRequest> = ['currency'];

    public defaultServiceCode(): ServiceCode {
        return 'subscriptions';
    }

    create(payload: ISubscription) {
        this.setPayload(payload);
        this.setServiceList('CreateSubscription', new Subscription(payload));
        return this.dataRequest();
    }

    update(payload: ISubscription) {
        this.setPayload(payload);
        this.setServiceList('UpdateSubscription', new Subscription(payload));
        return this.dataRequest();
    }

    createCombined(payload: ISubscription) {
        this.setPayload(payload);
        this.setServiceList('CreateCombinedSubscription', new Subscription(payload));
        return this.dataRequest();
    }

    updateCombined(payload: ISubscription) {
        this.setPayload(payload);
        this.setServiceList('UpdateCombinedSubscription', new Subscription(payload));
        return this.dataRequest();
    }

    stop(payload: { subscriptionGuid: string }) {
        this.setServiceList('StopSubscription', new Subscription(payload));
        return this.dataRequest();
    }

    info(payload: { subscriptionGuid: string }) {
        this.setServiceList('SubscriptionInfo', new Subscription(payload));
        return this.dataRequest();
    }

    deletePaymentConfig(payload: { subscriptionGuid: string }) {
        this.setServiceList('DeletePaymentConfiguration', new Subscription(payload));
        return this.dataRequest();
    }

    pause(payload: { subscriptionGuid: string; resumeDate: string }) {
        this.setServiceList('PauseSubscription', new ResumeSubscription(payload));
        return this.dataRequest();
    }

    resume(payload: { subscriptionGuid: string; resumeDate: string }) {
        this.setServiceList('ResumeSubscription', new ResumeSubscription(payload));
        return this.dataRequest();
    }
}
