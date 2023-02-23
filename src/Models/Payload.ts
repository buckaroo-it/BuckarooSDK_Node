import {IServiceList} from "./ServiceList";

export declare interface Payload{
    clientIP?: ClientIP,
    currency: string,
    returnURL?: string,
    returnURLError?: string,
    returnURLCancel?: string,
    returnURLReject?: string,
    pushURL?: string,
    pushURLFailure?: string,
    invoice: string,
    description?: string,
    originalTransactionKey?: string,
    originalTransactionReference?: string,
    websiteKey?: string,
    culture?: string,
    startRecurrent?: boolean,
    continueOnIncomplete?: string,
    servicesSelectableByClient?: string,
    servicesExcludedForClient?: string,
    customParameters?: Array<any>,
    additionalParameters?: any
    services?:IServiceList
}

export declare interface ClientIP{
    address: string,
    type: number
}

export declare interface AdditionalParameters{
    additionalParameter?: Array<AdditionalParameter>
}
export declare interface AdditionalParameter {
    value: number|string,
    name: string
}

export declare interface PayPayload extends Payload{
    order: string,
    amountDebit: number
}
