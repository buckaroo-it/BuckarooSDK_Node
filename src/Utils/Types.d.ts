export declare interface IConfig {
    mode?: 'live' | 'test';
    currency?: string;
    returnURL?: string;
    returnURLCancel?: string;
    pushURL?: string;
}
export declare interface ICredentials {
    websiteKey?: string;
    secretKey?: string;
}
export declare interface IPAddress {
    address: string;
    type: number;
}
