import { IPAddress } from '../Utils/Types'

export declare interface ITransaction {
    clientIP?: string | IPAddress
    currency?: string
    returnURL?: string
    returnURLError?: string
    returnURLCancel?: string
    returnURLReject?: string
    pushURL?: string
    pushURLFailure?: string
    invoice?: string
    order?: string
    amountDebit?: Number
    amountCredit?: Number
    description?: string
    originalTransactionKey?: string
    originalTransactionReference?: string
    // websiteKey?: string
    culture?: string
    startRecurrent?: boolean
    continueOnIncomplete?: string
    servicesSelectableByClient?: string
    servicesExcludedForClient?: string
    customParameters?: Array<any>
    additionalParameters?: AdditionalParameter
    services?: any
}

export declare interface ClientIP {
    address: string
    type: number
}

export declare type AdditionalParameter = {
    [name: string]: string | number
}

export declare interface Payload extends Omit<ITransaction, 'amountCredit'> {
    order?: string
    amountDebit: number
}

export declare interface RefundPayload extends Omit<ITransaction, 'amountDebit'> {
    order?: string
    amountCredit: number
    originalTransactionKey: string
}
export declare interface ICapture extends ITransaction {
    originalTransactionKey: string
    amountDebit: number
    invoice?: string
}
