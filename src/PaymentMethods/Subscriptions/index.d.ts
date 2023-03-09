import { ISubscription } from './Models/SubscriptionServices';
import { IConfig } from '../../Utils/Types';
import PaymentMethod from '../PaymentMethod';
declare class Subscriptions extends PaymentMethod {
    protected _paymentName: string;
    protected requiredFields: Array<keyof IConfig>;
    create(payload: ISubscription): Promise<any>;
    update(payload: ISubscription): Promise<any>;
    createCombined(payload: ISubscription): this;
    updateCombined(payload: ISubscription): this;
    stop(payload: {
        subscriptionGuid: string;
    }): Promise<any>;
    info(payload: {
        subscriptionGuid: string;
    }): Promise<any>;
    deletePaymentConfig(payload: {
        subscriptionGuid: string;
    }): Promise<any>;
    pause(payload: {
        subscriptionGuid: string;
        resumeDate: string;
    }): Promise<any>;
    resume(payload: {
        subscriptionGuid: string;
        resumeDate: string;
    }): Promise<any>;
}
declare const subscriptions: () => Subscriptions;
export default subscriptions;
