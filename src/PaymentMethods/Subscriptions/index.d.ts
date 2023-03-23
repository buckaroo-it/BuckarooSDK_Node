import { ISubscription } from './Models/SubscriptionServices';
import { IConfig } from '../../Utils/Types';
import PaymentMethod from '../PaymentMethod';
declare class Subscriptions extends PaymentMethod {
    protected _paymentName: string;
    protected _requiredFields: Array<keyof IConfig>;
    create(payload: ISubscription): Promise<any>;
    update(payload: ISubscription): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    createCombined(payload: ISubscription): this;
    updateCombined(payload: ISubscription): this;
    stop(payload: {
        subscriptionGuid: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    info(payload: {
        subscriptionGuid: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    deletePaymentConfig(payload: {
        subscriptionGuid: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    pause(payload: {
        subscriptionGuid: string;
        resumeDate: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    resume(payload: {
        subscriptionGuid: string;
        resumeDate: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const subscriptions: () => Subscriptions;
export default subscriptions;
