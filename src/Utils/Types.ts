export declare interface IConfig {
    mode: 'live' | 'test'
    currency: string
    returnURL: string
    returnURLCancel: string
    pushURL: string
}

export declare interface ICredentials {
    websiteKey: string
    secretKey: string
}

export declare interface IPAddress {
    address: string
    type: number
}
export type Subset<K> = {
    [attr in keyof K]?: K[attr] extends object
        ? Subset<K[attr]>
        : K[attr] extends object | null
            ? Subset<K[attr]> | null
            : K[attr] extends object | null | undefined
                ? Subset<K[attr]> | null | undefined
                : string;
};