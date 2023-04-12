export declare interface IConfig {
    mode: 'live' | 'test'
    currency: string
    returnURL: string
    returnURLCancel: string
    pushURL: string
    baseUrl: string
}

export declare interface ICredentials {
    websiteKey: string
    secretKey: string
}

export type IPAddress = {
    address: string
    type: number
}
type parameterType = string | number | boolean | undefined

export declare type AdditionalParameter = {
    [name: string]: parameterType
}
export declare interface ServiceParameters {
    [name: string]: parameterType | parameterType[] | ServiceParameters | ServiceParameters[]
}