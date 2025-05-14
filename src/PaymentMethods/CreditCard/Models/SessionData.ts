import { IPaymentRequest, ServiceParameter } from '../../../Models';

export interface ISessionData extends IPaymentRequest {
    sessionId: string;
}

export class SessionData extends ServiceParameter {
    set sessionId(value: string) {
        this.set('sessionId', value);
    }
}
