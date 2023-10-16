import { ServiceCode } from './MethodTypes';

export declare interface IConfig {
    mode: Mode;
    currency: string;
    continueOnIncomplete?: 0 | 1;
    returnURL?: string;
    returnURLCancel?: string;
    pushURL?: string;
    returnURLError?: string;
    returnURLReject?: string;
    activePaymentMethods?: ServiceCode[];
    disabledPaymentMethods?: ServiceCode[];
}

export declare interface ICredentials {
    websiteKey: string;
    secretKey: string;
}

export type Mode = "LIVE" | "TEST";
