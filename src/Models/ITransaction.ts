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
    culture?: string
    startRecurrent?: boolean
    continueOnIncomplete?: string
    servicesSelectableByClient?: string
    servicesExcludedForClient?: string
    customParameters?: AdditionalParameter
    services?: object
    additionalParameters?: AdditionalParameter
}

export declare type ClientIP =
    | string
    | {
          address: string
          type: number
      }

export declare type AdditionalParameter = {
    [name: string]: string | number | boolean
}


export declare interface Payload extends Omit<ITransaction, 'amountCredit'> {
    invoice?: string
    order?: string
    amountDebit: number
}

export declare interface RefundPayload extends Omit<ITransaction, 'amountDebit'> {
    order?: string
    amountCredit: number
    originalTransactionKey: string
}
export declare interface ICapture extends Payload {
    originalTransactionKey: string
}
